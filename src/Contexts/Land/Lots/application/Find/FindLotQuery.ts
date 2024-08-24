import {
  Query,
} from '#@/src/Contexts/Shared/domain/index.js'

export class FindLotQuery extends Query {
  constructor(readonly id: string) {
    super()
  }
}
