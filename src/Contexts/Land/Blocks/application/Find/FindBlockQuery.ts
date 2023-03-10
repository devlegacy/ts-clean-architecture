import { Query } from '@/Contexts/Shared/domain'

export class FindBlockQuery extends Query {
  constructor(readonly id: string) {
    super()
  }
}
