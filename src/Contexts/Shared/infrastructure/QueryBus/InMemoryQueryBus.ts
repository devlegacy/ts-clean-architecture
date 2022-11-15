import { injectable } from 'tsyringe'

import { Query, QueryBus, Response } from '../../domain'
import { QueryHandlers } from './QueryHandlers'

@injectable()
export class InMemoryQueryBus implements QueryBus {
  constructor(private readonly queryHandlers: QueryHandlers) {}

  async ask<R extends Response>(query: Query): Promise<R> {
    const handler = this.queryHandlers.get(query)
    const response = await handler.handle(query)

    return response as Promise<R>
  }
}
