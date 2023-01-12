import { EntityNotFoundException } from '../Exceptions/EntityNotFoundException'
import { Query } from './Query'

export class QueryNotRegisteredException extends EntityNotFoundException {
  constructor(query: Query) {
    super(`The query <${query.constructor.name}> hasn't a query handler associated`)
  }
}
