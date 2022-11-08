import { injectable } from 'tsyringe'

import { Query, QueryBus, Response } from '../../domain'
import { QueryHandlers } from './QueryHandlers'

@injectable()
export class InMemoryQueryBus implements QueryBus {
  constructor(private readonly queryHandlersInformation: QueryHandlers) {}

  async ask<R extends Response>(query: Query): Promise<R> {
    const handler = this.queryHandlersInformation.get(query)
    const response = await handler.handle(query)

    return response as Promise<R>
  }
}
