import { EntityNotFoundError } from '../Errors/EntityNotFoundError'
import { Query } from './Query'

export class QueryNotRegisteredError extends EntityNotFoundError {
  constructor(query: Query) {
    super(`The query <${query.constructor.name}> hasn't a query handler associated`)
  }
}
