import { Lot } from './Lot'

export interface LotRepository {
  save(lot: Lot): Promise<void>
}
