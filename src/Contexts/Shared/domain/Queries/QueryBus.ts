import {
  Query,
} from './Query.js'
import {
  Response,
} from './Response.js'

export abstract class QueryBus {
  abstract ask<R extends Response>(query: Query): Promise<R>
}
