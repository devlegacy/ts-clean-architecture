import {
  EntitySchema,
} from '@mikro-orm/core'

import {
  MikroOrmPostgresRepository,
} from '#@/src/Contexts/Shared/infrastructure/Persistence/postgres/index.js'

import {
  Cart,
  type CartRepository,
} from '../../domain/index.js'
import {
  CartEntity,
} from './mikroorm/postgres/CartEntity.js'

export class MikroOrmPostgresCartRepository extends MikroOrmPostgresRepository<Cart> implements CartRepository {
  async save(cart: Cart): Promise<void> {
    await this.persist(cart)
  }

  async find(id: Cart['id']): Promise<Nullable<Cart>> {
    const repository = await this.repository()
    const cart = await repository.findOne({
      id,
    })
    if (!cart) return null
    return cart
  }

  protected entitySchema(): EntitySchema<Cart> {
    return CartEntity
  }
}
