import { InvalidArgumentError, StringValueObject } from '@/Contexts/Shared/domain'

export class UserEmail extends StringValueObject {
  readonly #validEmailRegExp =
    /^(?=.*[@](?:gmail\.com|hotmail\.com)$)[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[a-zA-Z0-9_-]*$/

  constructor(override readonly value: string) {
    super(value)

    this.#ensureIsValidEmail(value)
  }

  toPrimitives(): string {
    return this.value
  }

  #ensureIsValidEmail(value: string): void {
    if (!this.#validEmailRegExp.test(value)) {
      throw new InvalidArgumentError(`<${value}> is not a valid email`)
    }
  }
}
