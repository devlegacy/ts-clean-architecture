import {
  Uuid,
} from '#@/src/Contexts/Shared/domain/index.js'

export class PostId extends Uuid {
  constructor(value: string) {
    super(value)
  }
}
