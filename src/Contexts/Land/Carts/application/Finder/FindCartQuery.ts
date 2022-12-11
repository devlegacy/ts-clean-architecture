import { Query } from '@/Contexts/Shared/domain'

export class FindCartQuery extends Query {
  readonly id: string

  constructor(id: string) {
    super()
    this.id = id
  }
}
