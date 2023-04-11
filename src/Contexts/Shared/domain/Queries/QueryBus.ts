import { Query } from './Query'
import { Response } from './Response'

export abstract class QueryBus {
  abstract ask<R extends Response>(query: Query): Promise<R>
}
