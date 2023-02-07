import { Constructor } from 'type-fest'

import { info } from '../../../Logger'
import { RESPONSE_PASSTHROUGH_METADATA, ROUTE_ARGS_METADATA } from '../../constants'
import { RouteParamtypes } from '../../enums'
import { PipeTransform } from '../../interfaces'
import { isNil, isString } from '../../utils'

class DefaultNumberTransformPipe {
  transform(value: any) {
    if (value === undefined || value === null) return value
    return Number(value)
  }
}

export interface ResponseDecoratorOptions {
  passthrough: boolean
}

// TODO: Why object (?)
export type ParamData = object | string | number
export interface RouteParamMetadata {
  index: number
  data?: ParamData
}

export function assignMetadata<TParamtype = any, TArgs = any>(
  args: TArgs,
  paramtype: TParamtype,
  index: number,
  data?: ParamData,
  ...pipes: (Constructor<PipeTransform> | PipeTransform)[]
) {
  return {
    ...args,
    [`${paramtype}:${index}`]: {
      index,
      data,
      pipes,
    },
  }
}

function createRouteParamDecorator(paramtype: RouteParamtypes) {
  return (data?: ParamData): ParameterDecorator =>
    (target, key, index) => {
      const args = Reflect.getMetadata(ROUTE_ARGS_METADATA, target.constructor, key) || {}
      Reflect.defineMetadata(
        ROUTE_ARGS_METADATA,
        assignMetadata<RouteParamtypes, Record<number, RouteParamMetadata>>(args, paramtype, index, data),
        target.constructor,
        key
      )
    }
}

const createPipesRouteParamDecorator =
  (paramtype: RouteParamtypes) =>
  (data?: any, ...pipes: (Constructor<PipeTransform> | PipeTransform)[]): ParameterDecorator =>
  (target, key, index) => {
    const args = Reflect.getMetadata(ROUTE_ARGS_METADATA, target.constructor, key) || {}
    const types: any[] = Reflect.getMetadata('design:paramtypes', target.constructor.prototype, key) || []

    const hasParamData = isNil(data) || isString(data)
    const paramData = (hasParamData ? data : undefined) as string
    const paramPipes = hasParamData ? pipes : [data, ...pipes]

    if (pipes.length) {
      info(pipes)
    }

    if (!paramPipes.length && typeof types.at(index) === 'function') {
      if (types.at(index)?.name === 'Number') {
        paramPipes.push(DefaultNumberTransformPipe)
      }
    }

    Reflect.defineMetadata(
      ROUTE_ARGS_METADATA,
      assignMetadata(args, paramtype, index, paramData, ...paramPipes),
      target.constructor,
      key
    )
  }

export const Request: () => ParameterDecorator = createRouteParamDecorator(RouteParamtypes.REQUEST)

export const Response: (options?: ResponseDecoratorOptions) => ParameterDecorator =
  (options?: ResponseDecoratorOptions) => (target, key, index) => {
    if (options?.passthrough) {
      Reflect.defineMetadata(RESPONSE_PASSTHROUGH_METADATA, options?.passthrough, target.constructor, key)
    }
    return createRouteParamDecorator(RouteParamtypes.RESPONSE)()(target, key, index)
  }

// export const Headers: (property?: string) => ParameterDecorator = createRouteParamDecorator(RouteParamtypes.HEADERS)
export function Headers(
  property?: string | (Constructor<PipeTransform> | PipeTransform),
  ...pipes: (Constructor<PipeTransform> | PipeTransform)[]
): ParameterDecorator {
  return createPipesRouteParamDecorator(RouteParamtypes.HEADERS)(property, ...pipes)
}

export function Query(): ParameterDecorator
export function Query(...pipes: (Constructor<PipeTransform> | PipeTransform)[]): ParameterDecorator
export function Query(property: string, ...pipes: (Constructor<PipeTransform> | PipeTransform)[]): ParameterDecorator
export function Query(
  property?: string | (Constructor<PipeTransform> | PipeTransform),
  ...pipes: (Constructor<PipeTransform> | PipeTransform)[]
): ParameterDecorator {
  return createPipesRouteParamDecorator(RouteParamtypes.QUERY)(property, ...pipes)
}

export function Body(): ParameterDecorator
export function Body(...pipes: (Constructor<PipeTransform> | PipeTransform)[]): ParameterDecorator
export function Body(property: string, ...pipes: (Constructor<PipeTransform> | PipeTransform)[]): ParameterDecorator
export function Body(
  property?: string | (Constructor<PipeTransform> | PipeTransform),
  ...pipes: (Constructor<PipeTransform> | PipeTransform)[]
): ParameterDecorator {
  return createPipesRouteParamDecorator(RouteParamtypes.BODY)(property, ...pipes)
}

export function Param(): ParameterDecorator
export function Param(...pipes: (Constructor<PipeTransform> | PipeTransform)[]): ParameterDecorator
export function Param(property: string, ...pipes: (Constructor<PipeTransform> | PipeTransform)[]): ParameterDecorator
export function Param(
  property?: string | (Constructor<PipeTransform> | PipeTransform),
  ...pipes: (Constructor<PipeTransform> | PipeTransform)[]
): ParameterDecorator {
  return createPipesRouteParamDecorator(RouteParamtypes.PARAM)(property, ...pipes)
}

export const Req = Request
export const Res = Response
