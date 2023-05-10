import { Query } from './Query'
import { Response } from './Response'

export interface QueryHandler<TQuery extends Query, TResponse extends Response> {
  // subscribedTo(): Query
  handle(query: TQuery): Promise<TResponse>
}
