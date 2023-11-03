import { Lot } from './Lot.js'

export abstract class LotRepository {
  abstract all(): Promise<Lot[]>
  abstract find(id: Lot['id']): Promise<Nullable<Lot>>

  abstract save(lot: Lot): Promise<void>
}
