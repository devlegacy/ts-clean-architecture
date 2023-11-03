import { Query } from '@/Contexts/Shared/domain/index.js'

export class FindLotQuery extends Query {
  constructor(readonly id: string) {
    super()
  }
}
