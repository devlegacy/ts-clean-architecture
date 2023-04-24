import { Lot } from './Lot'

export abstract class LotRepository {
  abstract all(): Promise<Lot[]>
  abstract find(id: Lot['id']): Promise<Nullable<Lot>>

  abstract save(lot: Lot): Promise<void>
}
