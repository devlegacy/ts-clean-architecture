import { injectAll, singleton } from 'tsyringe'

import { TYPES } from '@/apps/mooc/dependency-injection/types'

import { Query, QueryHandler, QueryNotRegisteredError, Response } from '../../domain'

@singleton()
export class QueryHandlers extends Map<Query, QueryHandler<Query, Response>> {
  constructor(@injectAll(TYPES.QueryHandler) queryHandlers: Array<QueryHandler<Query, Response>>) {
    super()
    queryHandlers.forEach((queryHandler) => {
      this.set(queryHandler.subscribedTo(), queryHandler)
    })
  }

  public get(query: Query): QueryHandler<Query, Response> {
    const queryHandler = super.get(query.constructor)

    if (!queryHandler) {
      throw new QueryNotRegisteredError(query)
    }

    return queryHandler
  }
}
