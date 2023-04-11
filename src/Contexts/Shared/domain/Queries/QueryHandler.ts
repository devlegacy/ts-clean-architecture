import { Query } from './Query'
import { Response } from './Response'

export interface IQueryHandler<Q extends Query, R extends Response> {
  // subscribedTo(): Query
  handle(query: Q): Promise<R>
}
