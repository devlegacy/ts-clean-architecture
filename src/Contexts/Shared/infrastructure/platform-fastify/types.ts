import { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify'

export type Request<
  RouteGeneric extends RouteGenericInterface = {
    Body: Record<string, any>
    Headers: Record<string, any>
    Params: Record<string, any>
    Querystring: Record<string, any>
  }
> = FastifyRequest<RouteGeneric>

export type Response = FastifyReply
