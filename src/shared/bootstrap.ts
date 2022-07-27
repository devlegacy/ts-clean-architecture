import { FastifyInstance, FastifySchema, HTTPMethods } from 'fastify'
import { opendirSync } from 'fs'
import HttpStatus from 'http-status'
import { ValidationError } from 'joi'
import { join, resolve } from 'path'
import { cwd } from 'process'
import { container, injectable, Lifecycle } from 'tsyringe'
import type { Class, Constructor } from 'type-fest'

import {
  getMethodGroup,
  getSchema,
  RequestMappingMetadata,
  RequestMethod,
  RouteParamMetadata,
  RouteParamtypes
} from './common'
import {
  HTTP_CODE_METADATA,
  METHOD_METADATA,
  PATH_METADATA,
  ROUTE_ARGS_METADATA,
  SCHEMA_METADATA
} from './common/constants'
import { PipeTransform } from './common/interfaces'
import { isConstructor, normalizePath } from './utils'

// Inspired: https://github.com/L2jLiga/fastify-decorators/blob/v4/lib/bootstrap/bootstrap.ts
async function* readModulesRecursively(path: string, filter: RegExp): AsyncIterable<Record<string, Class<unknown>>> {
  const dir = opendirSync(path)

  try {
    while (true) {
      const dirent = await dir.read()
      if (dirent === null) return

      const fullFilePath = join(path, dirent.name)

      if (dirent.isDirectory()) {
        yield* readModulesRecursively(fullFilePath, filter)
      } else if (filter.test(dirent.name)) {
        yield import(fullFilePath.toString()).then((m) => {
          return m
        })
      }
    }
  } finally {
    await dir.close()
  }
}

const entitiesRegister = async (path = './src') => {
  const controllers: Class<unknown>[] = []
  const dir = resolve(cwd(), path)

  for await (const entities of readModulesRecursively(dir, /\.(controller|entity)\.(ts|js)$/)) {
    const keys = Object.keys(entities)
    for (const key of keys) {
      const entity = entities[key]
      if (!isConstructor(entity)) continue

      controllers.push(entity)
    }
  }

  return controllers
}

const getInstance = (controller: Class<unknown>): Constructor<unknown> => {
  const { name } = controller
  if (!container.isRegistered(name)) {
    injectable()(controller)

    container.register(name, { useClass: controller }, { lifecycle: Lifecycle.Singleton })
  }
  // This is our instantiated class
  const instance = container.isRegistered(name) ? container.resolve(name) : new controller()

  return instance as Constructor<unknown>
}

const getControllerMetadata = (method: () => unknown) => {
  const routePath: RequestMappingMetadata[typeof PATH_METADATA] = Reflect.getMetadata(PATH_METADATA, method)
  const requestMethod: Required<RequestMappingMetadata>[typeof METHOD_METADATA] =
    Reflect.getMetadata(METHOD_METADATA, method) || RequestMethod.GET
  const httpCode: number =
    Reflect.getMetadata(HTTP_CODE_METADATA, method) ||
    (requestMethod === RequestMethod.POST ? HttpStatus.CREATED : HttpStatus.OK)

  // TODO: Delete
  const schema: { schema: FastifySchema; code: number } = Reflect.getMetadata(SCHEMA_METADATA, method) || {
    schema: {},
    code: 400
  }

  return {
    routePath,
    requestMethod,
    httpCode,
    schema
  }
}

const getFullPath = (controllerPath: string, routePath: RequestMappingMetadata['path']) => {
  controllerPath = normalizePath(controllerPath)
  if (typeof routePath === 'string') {
    routePath = normalizePath(routePath)
  } else {
    throw new Error('[Router/Controller loader]: typeof route path not defined')
  }

  return `${controllerPath}${routePath}`
}

const getKeyParam = (params: Record<string, RouteParamMetadata>): [number, number, string][] =>
  Object.keys(params).map((keyParam: string) => [
    ...(keyParam.split(':').map((value) => parseInt(value, 10)) as [number, number]),
    keyParam
  ])

// eslint-disable-next-line complexity, max-lines-per-function
const getParams = (
  params: Record<string, RouteParamMetadata & { pipes?: (Constructor<PipeTransform> | PipeTransform)[] }>,
  req: HttpRequest,
  res: HttpResponse
): unknown[] => {
  // HttpRequest | HttpResponse | unknown
  const routeParams: unknown[] = []

  const keyParams = params ? getKeyParam(params) : []
  for (const keyParam of keyParams) {
    const [paramtype, index, key] = keyParam
    const { data, pipes } = params[key]

    if (paramtype === RouteParamtypes.REQUEST) {
      routeParams[index] = req
    } else if (paramtype === RouteParamtypes.RESPONSE) {
      routeParams[index] = res
    } else if (paramtype === RouteParamtypes.QUERY) {
      if (data && pipes && Array.isArray(pipes)) {
        // eslint-disable-next-line max-depth
        for (const pipe of pipes) {
          // eslint-disable-next-line max-depth
          if (isConstructor(pipe)) {
            req.query[data as string] = new (pipe as Constructor<PipeTransform>)().transform(
              req.query[data as string],
              {
                type: 'query'
              }
            )
          }
        }
      }
      // Extract a part of query
      routeParams[index] = data ? req.query[data as string] : req.query
    } else if (paramtype === RouteParamtypes.PARAM) {
      routeParams[index] = req.params
    } else if (paramtype === RouteParamtypes.BODY) {
      routeParams[index] = req.body
    } else if (paramtype === RouteParamtypes.HEADERS) {
      if (data && pipes && Array.isArray(pipes)) {
        // eslint-disable-next-line max-depth
        for (const pipe of pipes) {
          // eslint-disable-next-line max-depth
          if (isConstructor(pipe)) {
            req.query[data as string] = new (pipe as Constructor<PipeTransform>)().transform(
              req.query[data as string],
              {
                type: 'custom'
              }
            )
          }
        }
      }
      // Extract a part of headers
      routeParams[index] = data ? req.headers[data as string] : req.headers
    }
  }

  return routeParams
}

const buildSchemaWithParams = (
  params: Record<string, RouteParamMetadata>,
  schema: any,
  method: any,
  args: any[] = []
): any => {
  const keyParams = getKeyParam(params)
  // console.log(args)
  for (const keyParam of keyParams) {
    const [paramtype, index] = keyParam

    if (!args.at(index) || !isConstructor(args.at(index)) || args.at(index).name === 'Object') continue

    if (paramtype === RouteParamtypes.QUERY) {
      schema.schema.querystring = args.at(index)
    } else if (paramtype === RouteParamtypes.PARAM) {
      schema.schema.params = args.at(index)
    } else if (paramtype === RouteParamtypes.BODY) {
      schema.schema.body = args.at(index)
    } else if (paramtype === RouteParamtypes.HEADERS) {
      schema.schema.headers = args.at(index)
    }
  }

  schema.schema = getSchema(schema.schema, getMethodGroup(method))

  return schema
}

/**
 * TODO: Should be a singleton because has a child container creation
 * @param fastify
 * @param config
 */
// eslint-disable-next-line complexity, max-lines-per-function
export const bootstrap = async (fastify: FastifyInstance, config: { controller: string }) => {
  // const controllerContainer = container.createChildContainer()

  const controllers = await entitiesRegister(config.controller)
  for (const controller of controllers) {
    const instance = getInstance(controller)
    const instanceConstructor = instance.constructor
    const instancePrototype = instanceConstructor.prototype

    // The prefix saved to our controller
    // | controller
    const controllerPath: string = Reflect.getMetadata(PATH_METADATA, instanceConstructor)
    // Access from instance
    // | controller.prototype | instance.__proto__
    // | Reflect.ownKeys(Object.getPrototypeOf(instance))
    const classMethodNames: (string | symbol)[] = Reflect.ownKeys(instancePrototype)
    for (const methodName of classMethodNames) {
      if (methodName === 'constructor') continue // ignore constructor method reflect metadata

      const method: () => unknown = instancePrototype[methodName]
      const { routePath, requestMethod, httpCode, schema } = getControllerMetadata(method)

      const params: Record<string, any> = Reflect.getMetadata(ROUTE_ARGS_METADATA, instanceConstructor, methodName)
      if (params) {
        const args: any[] = Reflect.getMetadata('design:paramtypes', instancePrototype, methodName) || []
        buildSchemaWithParams(params, schema, requestMethod, args)
      }

      fastify.route({
        method: RequestMethod[requestMethod] as HTTPMethods,
        schema: !Object.keys(schema?.schema || {}).length ? undefined : schema.schema,
        attachValidation: true,
        url: getFullPath(controllerPath, routePath),
        preParsing: (req, res, payload, done) => {
          // Some code
          done(null, payload)
        },
        preValidation: (req, res, done) => {
          // Some code
          done()
        },
        handler: (req: HttpRequest, res: HttpResponse) => {
          res.status(httpCode)
          if (req.validationError) {
            const error = req.validationError
            // Is JOI
            if (error instanceof ValidationError) {
              return res.status(schema.code).send(error)
            }
            return res.status(500).send(new Error('Unhandled error'))
          }
          const routeParams = getParams(params, req, res)
          // Reflect.getMetadata('__routeArguments__',instanceConstructor,'params')
          // const currentMethodFn = instance[method.name]
          // method() // por alguna razón pierde el bind
          // instance[methodName]() - Revisar que conserve el valor de this
          // instance[methodName]
          return instancePrototype[methodName].apply(instance, routeParams)
        }
      })
    }
  }
}
