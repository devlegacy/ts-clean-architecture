import {
  injectable,
} from 'tsyringe'

import {
  CartId,
} from '#@/src/Contexts/Land/Shared/domain/index.js'
import {
  Query,
  type QueryHandler,
} from '#@/src/Contexts/Shared/domain/index.js'

import {
  CartResponse,
} from '../CartResponse.js'
import {
  CartFinder,
} from './CartFinder.js'
import {
  FindCartQuery,
} from './FindCartQuery.js'

@injectable()
export class FindCartQueryHandler implements QueryHandler<FindCartQuery, CartResponse> {
  constructor(private readonly finder: CartFinder) {}

  subscribedTo(): Query {
    return FindCartQuery
  }

  async handle(query: FindCartQuery): Promise<CartResponse> {
    const id = new CartId(query.id)
    const cart = await this.finder.run(id)
    const response = new CartResponse(cart)
    return response
  }
}
