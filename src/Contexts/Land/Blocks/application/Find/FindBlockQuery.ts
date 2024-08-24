import {
  Query,
} from '#@/src/Contexts/Shared/domain/index.js'

export class FindBlockQuery extends Query {
  constructor(readonly id: string) {
    super()
  }
}
