import {
  EntityNotFoundError,
} from '../Errors/EntityNotFoundError.js'
import {
  Query,
} from './Query.js'

export class QueryNotRegisteredError extends EntityNotFoundError {
  constructor(query: Query) {
    super(`The query <${query.constructor.name}> hasn't a query handler associated`)
  }
}
