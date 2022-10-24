import { Query } from '../Query'
import { EntityNotFoundException } from './EntityNotFoundException'

export class QueryNotRegisteredError extends EntityNotFoundException {
  constructor(query: Query) {
    super(`The query <${query.constructor.name}> hasn't a query handler associated`)
  }
}
