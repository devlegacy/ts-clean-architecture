import { StringValueObject } from '@/Contexts/Shared/domain'

import { UserBadEntityException } from './UserBadEntityException'

export class UserUsername extends StringValueObject {
  constructor(value: string) {
    super(value)
    this.isLengthValid()
  }

  private isLengthValid() {
    if (!this.value.length) throw new UserBadEntityException()
  }
}
