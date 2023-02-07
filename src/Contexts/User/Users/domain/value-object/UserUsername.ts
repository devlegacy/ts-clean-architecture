import { StringValueObject } from '@/Contexts/Shared/domain'

import { UserBadEntityError } from '../exception'

export class UserUsername extends StringValueObject {
  constructor(value: string) {
    super(value)
    this.isLengthValid()
  }

  private isLengthValid() {
    if (!this.value.length) throw new UserBadEntityError()
  }
}
