import { inject, injectable } from 'tsyringe'

import { TYPES } from '@/apps/mooc/dependency-injection/types'

import { Query, QueryBus, Response } from '../../domain'
import { QueryHandlers } from './QueryHandlers'

@injectable()
export class InMemoryQueryBus implements QueryBus {
  constructor(@inject(TYPES.QueryHandler) private queryHandlersInformation: QueryHandlers) {}

  async ask<R extends Response>(query: Query): Promise<R> {
    const handler = this.queryHandlersInformation.get(query)

    return (await handler.handle(query)) as Promise<R>
  }
}
