import { InvalidArgumentError, StringValueObject } from '@/Contexts/Shared/domain'

export class UserEmail extends StringValueObject {
  readonly #validEmailRegExp = new RegExp(
    `^(?=.*[@](?:gmail\\.com|hotmail\\.com)$)` + // Verifica que el dominio sea gmail.com o hotmail.com
      `[A-Za-z0-9!#$%&'*+/=?^_\`{|}~-]+` + // Caracteres permitidos antes de la @
      `(?:\\.[A-Za-z0-9!#$%&'*+/=?^_\`{|}~-]+)*` + // Caracteres permitidos después de la @ (dominio)
      `@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\\.)+[a-zA-Z0-9_-]*$` // Verifica el formato del dominio
  )

  constructor(override readonly value: string) {
    super(value)

    this.#ensureEmailIsValid(value)
  }

  toPrimitives(): string {
    return this.value
  }

  #ensureEmailIsValid(value: string): void {
    if (!this.#validEmailRegExp.test(value)) {
      throw new InvalidArgumentError(`<${value}> is not a valid email`)
    }
  }
}
