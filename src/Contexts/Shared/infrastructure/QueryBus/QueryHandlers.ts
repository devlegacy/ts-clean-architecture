import { IQueryHandler, Query, QUERY_HANDLER_METADATA, QueryNotRegisteredError, Response } from '../../domain'

export class QueryHandlers extends Map<Query, IQueryHandler<Query, Response>> {
  constructor(private readonly handlers: IQueryHandler<Query, Response>[]) {
    // constructor() {
    //   const token = SHARED_TYPES.CommandHandler
    //   const queryHandlers: QueryHandler<Query, Response>[] = container.isRegistered(token)
    //     ? // ? container.resolveAll<QueryHandler<Query, Response>>(token)
    //       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //       // @ts-expect-error
    //       container.getAllRegistrations(token)
    //     : []

    super()

    this.handlers.forEach((handler) => {
      this.set(Reflect.getMetadata(QUERY_HANDLER_METADATA, handler.constructor), handler)
    })
  }

  override get(query: Query): IQueryHandler<Query, Response> {
    const queryHandler = super.get(query.constructor)

    if (!queryHandler) {
      throw new QueryNotRegisteredError(query)
    }

    return queryHandler
  }
}
