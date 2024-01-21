import cluster from 'node:cluster'
import { opendirSync } from 'node:fs'
import { cpus } from 'node:os'
import { join, resolve } from 'node:path'
import { cwd } from 'node:process'
import { pathToFileURL } from 'node:url'

import type { FastifyInstance, FastifyRequest, FastifySchema, HTTPMethods } from 'fastify'

import { info } from '@/Contexts/Shared/infrastructure/Logger/index.js'

import {
  type ControllerResolver,
  HTTP_CODE_METADATA,
  HttpStatus,
  METHOD_METADATA,
  ParamExtractors,
  PATH_METADATA,
  type PipeTransform,
  type RequestMappingMetadata,
  RequestMethod,
  ROUTE_ARGS_METADATA,
  type RouteParamMetadata,
  RouteParamtypes,
  SCHEMA_METADATA,
} from '../../domain/Common/index.js'
import { isConstructor, normalizePath } from '../../domain/index.js'
import { Primary } from './cluster.js'
import { FastifyAdapter } from './FastifyAdapter.js'
import type { HttpValidationModule } from './interfaces/index.js'

type Route = {
  method: HTTPMethods
  schema: any
  url: string
  httpCode: number
  params: Record<string, any>
  instance: any
  methodName: string | symbol
}

type RouteRegisterProps = {
  controller: string | Class<unknown>[]
  resolver: ControllerResolver
  // isProduction: boolean
  prefix?: string
  // container?: any
}

const availableCpus = cpus().length

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
        // console.log(fullFilePath.toString())
        // console.log(pathToFileURL(fullFilePath.toString()).toString())
        yield import(pathToFileURL(fullFilePath.toString()).toString()).then((m) => {
          return m
        })
      }
    }
  } finally {
    await dir.close()
  }
}

const getControllers = async (path = './src') => {
  const controllers: Class<unknown>[] = []
  const dir = resolve(cwd(), path)

  for await (const entities of readModulesRecursively(dir, /Controller\.(ts|js)$/)) {
    const keys = Object.keys(entities)
    for (const key of keys) {
      const entity = entities[`${key}`]
      if (!isConstructor(entity)) continue

      controllers.push(entity)
    }
  }

  return controllers
}

const getControllerMetadata = (controller: Class<unknown>, resolver: ControllerResolver) => {
  const instance = resolver(controller)
  const {
    // has controller path by metadata
    // has arguments by method name and metadata
    constructor: instanceConstructor,
    // has methods
    // has design:paramtypes (parameter type in method) by metadata
    // has callable method to be executed in route
    constructor: { prototype: instancePrototype },
  } = instance

  // The prefix saved to our controller
  // | controller
  const controllerPath: string = Reflect.getMetadata(PATH_METADATA, instanceConstructor)
  // Access from instance
  // | controller.prototype | instance.__proto__
  // | Reflect.ownKeys(Object.getPrototypeOf(instance))
  const classMethodNames: (string | symbol)[] = Reflect.ownKeys(instancePrototype)

  return {
    instance,
    instanceConstructor,
    instancePrototype,
    controllerPath,
    classMethodNames,
  }
}

const getRouteMethodMetadata = (method: () => unknown) => {
  const routePath: RequestMappingMetadata[typeof PATH_METADATA] = Reflect.getMetadata(PATH_METADATA, method)
  // const requestMethod: Required<RequestMappingMetadata>[typeof METHOD_METADATA] =
  const requestMethod: RequestMethod = Reflect.getMetadata(METHOD_METADATA, method) || RequestMethod.GET
  const httpCode: number =
    Reflect.getMetadata(HTTP_CODE_METADATA, method) ||
    (requestMethod === RequestMethod.POST ? HttpStatus.CREATED : HttpStatus.OK)

  // TODO: Delete, this is a deprecated utility
  const schema: { schema: FastifySchema; code: number } = Reflect.getMetadata(SCHEMA_METADATA, method) || {
    schema: {},
    code: HttpStatus.UNPROCESSABLE_ENTITY,
  }

  return {
    routePath,
    requestMethod,
    httpCode,
    schema,
  }
}

const getRoutePathUrl = (prefix: string, controllerPath: string, routePath: RequestMappingMetadata['path']) => {
  if (Array.isArray(routePath)) routePath = routePath.reduce((curr, next) => `${curr}/${next}`)

  prefix = prefix ?? normalizePath(prefix)
  controllerPath = normalizePath(controllerPath)
  routePath = normalizePath(routePath)

  return normalizePath(`${prefix}${controllerPath}${routePath}`)
}

const getKeyParam = (params: Record<string, RouteParamMetadata>): [number, number, string][] =>
  Object.keys(params).map((keyParam: string) => [
    ...(keyParam.split(':').map((value) => parseInt(value, 10)) as [number, number]),
    keyParam,
  ])

const DEFAULT_METADATA = {
  data: undefined,
  pipes: undefined,
}
const getParams = (
  req: any,
  res: any,
  params: Record<string, RouteParamMetadata & { pipes?: (Constructor<PipeTransform> | PipeTransform)[] }>,
): unknown[] => {
  // HttpRequest | HttpResponse | unknown
  const routeParams: unknown[] = []
  const keyParams = params ? getKeyParam(params) : []

  for (const keyParam of keyParams) {
    const [paramtype, index, key] = keyParam
    const { data, pipes } = params[`${key}`] || DEFAULT_METADATA

    const routeParamValue = ParamExtractors[+paramtype]?.extract(req, res, data, pipes)

    routeParams[`${index}`] = routeParamValue
  }

  return routeParams
}

const buildSchema = (
  schema: FastifySchema,
  method: RequestMethod,
  builders?: HttpValidationModule<unknown>[],
): FastifySchema | undefined => {
  // Quién me da el esquema?
  if (!builders || !builders.length) return

  // this kind of focus allow to combine schemas
  const properties = Object.keys(schema) as (keyof FastifySchema)[]
  if (!properties.length) return

  for (const builder of builders) {
    for (const property of properties) {
      builder.schemaBuilder(schema, property, method)
    }
  }
}

const buildSchemaWithParams = (
  params: Record<string, RouteParamMetadata>,
  schema: { schema: FastifySchema; code: number },
  method: RequestMethod,
  args: (() => unknown)[] = [],
  validations: HttpValidationModule<unknown>[] = [],
): void => {
  if (Object.keys(schema.schema).length > 0) {
    // schema.schema = getSchema(schema.schema, method, validations)
    buildSchema(schema.schema, method, validations)
    // return schema
  }
  const keyParams = getKeyParam(params)
  for (const keyParam of keyParams) {
    const [paramtype, index] = keyParam

    if (!args.at(index) || !isConstructor(args.at(index)) || args.at(index)?.name === 'Object') continue

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

  // schema.schema = getSchema(schema.schema, method, validations)
  buildSchema(schema.schema, method, validations)
  // return schema
}

const routeBuilder = (adapterInstance: FastifyAdapter, controller: Class<unknown>, props: RouteRegisterProps) => {
  const { instance, instanceConstructor, instancePrototype, classMethodNames, controllerPath } = getControllerMetadata(
    controller,
    props.resolver,
  )
  for (const methodName of classMethodNames) {
    if (methodName === 'constructor') continue // ignore constructor method reflect metadata

    const method: () => unknown = instance[String(methodName)]
    const { routePath, requestMethod, httpCode, schema } = getRouteMethodMetadata(method)
    if (!routePath) continue // is not a route in controller

    const params: Record<string, RouteParamMetadata> = Reflect.getMetadata(
      ROUTE_ARGS_METADATA,
      instanceConstructor,
      methodName,
    )
    if (params) {
      const args: (() => unknown)[] = Reflect.getMetadata('design:paramtypes', instancePrototype, methodName) || []
      buildSchemaWithParams(params, schema, requestMethod, args, adapterInstance.validations)
    }

    const route: Route = {
      method: RequestMethod[`${requestMethod}`] as HTTPMethods,
      schema: !Object.keys(schema?.schema || {}).length ? undefined : schema.schema,
      url: getRoutePathUrl(props.prefix ?? '', controllerPath, routePath),
      httpCode,
      params,
      instance,
      methodName,
    }
    clusterServer(adapterInstance.app, route)
  }
}

const clusterServer = (
  fastify: FastifyInstance,
  { method, schema, url, httpCode, params, instance, methodName }: Route,
  isProduction = false,
) => {
  // eslint-disable-next-line no-constant-condition
  if (cluster.isPrimary && isProduction && false) {
    const primary = new Primary({ cluster })
    const limit = availableCpus
    for (let i = 0; i < limit; i++) primary.loadWorker()
    cluster.on('exit', (worker) => {
      info(`Cluster number: ${worker.id} stopped`)
      primary.loadStoppedWorker()
    })
  } else {
    info(`Cluster child`)
    fastify.route({
      method,
      schema,
      // attachValidation: true,
      url,
      // preParsing: (req, res, payload, done) => {
      //   // Some code
      //   done(null, payload)
      // },
      // preValidation: (req, res, done) => {
      //   // Some code
      //   done()
      // },
      // onError: (request, reply, error, done) => {
      //   done()
      // },
      // errorHandler: (error, request, response) => {
      //   fastify.errorHandler(error, request, response)
      // },
      handler: (req: FastifyRequest<{ Body: unknown }>, res) => {
        res.status(httpCode)
        // if (req.validationError) {
        //   const err = req.validationError
        //   // Is JOI
        //   if (err instanceof ValidationError) {
        //     return res.status(schema.code).send(err)
        //   }
        //   return res.status(500).send(new Error(`handler: Unhandled error ${err.message}`))
        // }
        const routeParams = getParams(req, res, params)
        // Reflect.getMetadata('__routeArguments__',instanceConstructor,'params')
        // const currentMethodFn = instance[method.name]
        // method() // por alguna razón pierde el bind
        // instance[methodName]() - Revisar que conserve el valor de this
        // instance[methodName]
        const response: Promise<unknown> | unknown = instance.constructor.prototype[String(methodName)].apply(
          instance,
          routeParams.length ? routeParams : [req, res],
        )
        return response
      },
    })
  }
}

/**
 * Registrar controladores, solo relacionado a capa de infraestructura HTTP
 * TODO: Should be a singleton because has a child container creation
 * @param adapterInstance
 * @param props
 */
// export const bootstrap = async (fastify: FastifyInstance<Http2SecureServer>, props: { controller: string }) => {
export const routeRegister = async (adapterInstance: FastifyAdapter, props: RouteRegisterProps) => {
  // const controllerContainer = container.createChildContainer()
  const controllers = Array.isArray(props.controller) ? props.controller : await getControllers(props.controller)
  for (const controller of controllers) {
    routeBuilder(adapterInstance, controller, props)
  }
}
