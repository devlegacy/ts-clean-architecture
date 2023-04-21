// index.d.

// Type {Request} presenta problemas con superTest y express

// Temp typing - only for dev purposes
type Request<
  RouteGeneric = {
    Body: Record<string, any>
    Headers: Record<string, any>
    Params: Record<string, any>
    Querystring: Record<string, any>
  }
> = import('fastify').FastifyRequest<RouteGeneric>

// Temp typing - only for dev purposes
type Response = import('fastify').FastifyReply
