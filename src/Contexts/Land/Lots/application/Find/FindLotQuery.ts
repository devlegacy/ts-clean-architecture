import { Query } from '@/Contexts/Shared/domain'

export class FindLotQuery extends Query {
  constructor(readonly id: string) {
    super()
  }
}
