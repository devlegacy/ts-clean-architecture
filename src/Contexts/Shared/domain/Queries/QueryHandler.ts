import { Query } from './Query.js'
import { Response } from './Response.js'

export interface QueryHandler<TQuery extends Query, TResponse extends Response> {
  // subscribedTo(): Query
  handle(query: TQuery): Promise<TResponse>
}
