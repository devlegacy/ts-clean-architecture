import { EntitySchema } from '@mikro-orm/core'

import { Cart } from '@/Contexts/Land/Carts/domain'
import { CartCheckout } from '@/Contexts/Land/Carts/domain/value-object'
import { CartId, UserId } from '@/Contexts/Land/Shared/domain'
import { ValueObjectTransformer } from '@/Contexts/Shared/infrastructure/persistence/mikroorm'

export const CartEntity = new EntitySchema<Cart>({
  name: 'Cart',
  tableName: 'carts',
  class: Cart,
  properties: {
    id: {
      customType: new ValueObjectTransformer(CartId, 'string'),
      primary: true
    },
    userId: {
      customType: new ValueObjectTransformer(UserId, 'string')
    },
    checkout: {
      customType: new ValueObjectTransformer(CartCheckout, 'boolean')
    }
  }
})
