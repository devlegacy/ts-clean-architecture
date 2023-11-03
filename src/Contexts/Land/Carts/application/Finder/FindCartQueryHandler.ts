import { injectable } from 'tsyringe'

import { CartId } from '@/Contexts/Land/Shared/domain/index.js'
import { Query, QueryHandler } from '@/Contexts/Shared/domain/index.js'

import { CartResponse } from '../CartResponse'
import { CartFinder } from './CartFinder'
import { FindCartQuery } from './FindCartQuery'

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
