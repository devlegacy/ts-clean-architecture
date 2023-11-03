import { Query } from '@/Contexts/Shared/domain/index.js'

export class FindBlockQuery extends Query {
  constructor(readonly id: string) {
    super()
  }
}
