import {
  Uuid,
} from '#@/src/Contexts/Shared/domain/index.js'

export class PostLikeId extends Uuid {
  constructor(value: string) {
    super(value)
  }
}
