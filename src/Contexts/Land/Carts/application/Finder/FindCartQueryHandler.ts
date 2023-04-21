import { injectable } from 'tsyringe'

import { CartId } from '@/Contexts/Land/Shared/domain'
import { IQueryHandler, Query } from '@/Contexts/Shared/domain'

import { CartResponse } from '../CartResponse'
import { CartFinder } from './CartFinder'
import { FindCartQuery } from './FindCartQuery'

@injectable()
export class FindCartQueryHandler implements IQueryHandler<FindCartQuery, CartResponse> {
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
