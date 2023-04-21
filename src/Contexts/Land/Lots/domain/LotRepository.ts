import { Lot } from './Lot'

export interface LotRepository {
  all(): Promise<Lot[]>
  find(id: Lot['id']): Promise<Nullable<Lot>>

  save(lot: Lot): Promise<void>
}
