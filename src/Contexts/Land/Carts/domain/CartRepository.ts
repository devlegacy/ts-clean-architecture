import { Cart } from './Cart'

export interface CartRepository {
  save(cart: Cart): Promise<void>

  find(id: Cart['id']): Promise<Nullable<Cart>>
}
