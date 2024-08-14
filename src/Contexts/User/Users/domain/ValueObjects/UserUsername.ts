import {
  StringValueObject,
} from '#@/src/Contexts/Shared/domain/index.js'

import {
  UserBadEntityError,
} from '../Errors/index.js'

export class UserUsername extends StringValueObject {
  constructor(value: string) {
    super(value)
    this.isLengthValid()
  }

  private isLengthValid() {
    if (!this.value.length) throw new UserBadEntityError()
  }
}
