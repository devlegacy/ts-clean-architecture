import bcrypt from 'bcrypt'

import {
  StringValueObject,
} from '#@/src/Contexts/Shared/domain/index.js'

export class UserPassword extends StringValueObject {
  constructor(value: string) {
    super(value)
  }

  static build(value: string) {
    return new UserPassword(value)
  }

  static hash(value: string) {
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(
      value,
      salt,
    )

    return new UserPassword(hashedPassword)
  }
}
