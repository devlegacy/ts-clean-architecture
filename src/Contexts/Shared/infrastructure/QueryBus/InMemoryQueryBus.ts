import { Service } from 'diod'

import { Query, QueryBus, Response } from '../../domain/index.js'
import { QueryHandlers } from './QueryHandlers.js'

@Service()
export class InMemoryQueryBus implements QueryBus {
  constructor(private readonly handlers: QueryHandlers) {}

  async ask<R extends Response>(query: Query): Promise<R> {
    const handler = this.handlers.get(query)
    const response = await handler.handle(query)

    return response as Promise<R>
  }
}
