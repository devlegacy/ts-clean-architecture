import { injectAll, singleton } from 'tsyringe'

import { Query, QueryHandler, QueryNotRegisteredException, Response } from '../../domain'
import { SHARED_TYPES } from '../common'

@singleton()
export class QueryHandlers extends Map<Query, QueryHandler<Query, Response>> {
  constructor(@injectAll(SHARED_TYPES.QueryHandler) queryHandlers: QueryHandler<Query, Response>[]) {
    super()
    queryHandlers.forEach((queryHandler) => {
      this.set(queryHandler.subscribedTo(), queryHandler)
    })
  }

  get(query: Query): QueryHandler<Query, Response> {
    const queryHandler = super.get(query.constructor)

    if (!queryHandler) {
      throw new QueryNotRegisteredException(query)
    }

    return queryHandler
  }
}
