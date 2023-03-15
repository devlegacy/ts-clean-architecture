import { injectAll, singleton } from 'tsyringe'

import { Query, QueryHandler, QueryNotRegisteredError, Response } from '../../domain'
import { SHARED_TYPES } from '../common'

@singleton()
export class QueryHandlers extends Map<Query, QueryHandler<Query, Response>> {
  constructor(@injectAll(SHARED_TYPES.QueryHandler) queryHandlers: QueryHandler<Query, Response>[]) {
    // constructor() {
    //   const token = SHARED_TYPES.CommandHandler
    //   const queryHandlers: QueryHandler<Query, Response>[] = container.isRegistered(token)
    //     ? // ? container.resolveAll<QueryHandler<Query, Response>>(token)
    //       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //       // @ts-expect-error
    //       container.getAllRegistrations(token)
    //     : []

    super()

    queryHandlers.forEach((queryHandler) => {
      this.set(queryHandler.subscribedTo(), queryHandler)
    })
  }

  override get(query: Query): QueryHandler<Query, Response> {
    const queryHandler = super.get(query.constructor)

    if (!queryHandler) {
      throw new QueryNotRegisteredError(query)
    }

    return queryHandler
  }
}
