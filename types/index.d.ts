// index.d.

// Type {Request} presenta problemas con superTest y express

// Temp typing - only for dev purposes
type HttpRequest<
  RouteGeneric = { Params: Record<string, any>; Querystring: Record<string, any>; Body: Record<string, any> }
> = import('fastify').FastifyRequest<
  RouteGeneric,
  import('http2').Http2SecureServer,
  import('http2').Http2ServerRequest,
  unknown,
  import('fastify').FastifyLoggerInstance
>

// Temp typing - only for dev purposes
type HttpResponse = import('fastify').FastifyReply
