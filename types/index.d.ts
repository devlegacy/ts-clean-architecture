// index.d.

// Type {Request} presenta problemas con superTest y express

// Temp typing - only for dev purposes
type Request<
  RouteGeneric = { Params: Record<string, any>; Querystring: Record<string, any>; Body: Record<string, any> }
> = import('fastify').FastifyRequest<RouteGeneric>
// Temp typing - only for dev purposes
type Response = import('fastify').FastifyReply
