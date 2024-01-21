import { isConstructor } from '../shared.utils.js'
import type { ParamData } from './Decorators/index.js'
import { RouteParamtypes } from './enums/index.js'
import type { ParamExtractor, Paramtype, PipeTransform } from './interfaces/index.js'

const pipeBuilder = (
  req: any,
  type: Paramtype,
  data?: ParamData,
  pipes?: (Constructor<PipeTransform> | PipeTransform)[],
) => {
  if (!(data && pipes && Array.isArray(pipes))) return

  for (const pipe of pipes) {
    const reqType: any = req[`${type}`]
    if (!isConstructor<PipeTransform>(pipe) || !reqType) continue
    reqType[`${data}`] = new pipe().transform(reqType[`${data}`], {
      type,
    })
  }
}

class RequestParamExtractor implements ParamExtractor {
  extract(req: any): unknown {
    return req
  }
}

class ResponseParamExtractor implements ParamExtractor {
  extract(req: any, res: any): unknown {
    return res
  }
}

class QueryParamExtractor implements ParamExtractor {
  extract(
    req: any,
    res: any,
    data: ParamData | undefined,
    pipes?: (Constructor<PipeTransform> | PipeTransform)[],
  ): unknown {
    pipeBuilder(req, 'query', data, pipes)
    return data ? req.query[`${data}`] : req.query
  }
}

class ParamParamExtractor implements ParamExtractor {
  extract(
    req: any,
    res: any,
    data: ParamData | undefined,
    pipes?: (Constructor<PipeTransform> | PipeTransform)[],
  ): unknown {
    pipeBuilder(req, 'params', data, pipes)
    return data ? req.params[`${data}`] : req.params
  }
}

class BodyParamExtractor implements ParamExtractor {
  extract(
    req: any,
    res: any,
    data: ParamData | undefined,
    pipes?: (Constructor<PipeTransform> | PipeTransform)[],
  ): unknown {
    pipeBuilder(req, 'body', data, pipes)
    return data ? req.body[`${data}`] : req.body
  }
}

class HeaderParamExtractor implements ParamExtractor {
  extract(
    req: any,
    res: any,
    data: ParamData | undefined,
    pipes?: (Constructor<PipeTransform> | PipeTransform)[],
  ): unknown {
    pipeBuilder(req, 'headers', data, pipes)
    return data ? req.headers[`${data}`] : req.headers
  }
}

class CookieParamExtractor implements ParamExtractor {
  extract(req: any, res: any, data: ParamData | undefined): unknown {
    return data ? req.cookies?.[`${data}`] : req.cookies
  }
}

export const ParamExtractors: { [key: number]: ParamExtractor } = {
  [RouteParamtypes.REQUEST]: new RequestParamExtractor(),
  [RouteParamtypes.RESPONSE]: new ResponseParamExtractor(),
  [RouteParamtypes.QUERY]: new QueryParamExtractor(),
  [RouteParamtypes.PARAM]: new ParamParamExtractor(),
  [RouteParamtypes.BODY]: new BodyParamExtractor(),
  [RouteParamtypes.HEADERS]: new HeaderParamExtractor(),
  [RouteParamtypes.COOKIES]: new CookieParamExtractor(),
}
