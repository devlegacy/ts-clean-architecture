import { InvalidArgumentError, StringValueObject } from '@/Contexts/Shared/domain/index.js'

// const USER_EMAIL_REGEXP = new RegExp(
//   `^(?=.*[@](?:gmail\\.com|hotmail\\.com)$)` + // Verifica que el dominio sea gmail.com o hotmail.com
//     `[A-Za-z0-9!#$%&'*+/=?^_\`{|}~-]+` + // Caracteres permitidos antes de la @
//     `(?:\\.[A-Za-z0-9!#$%&'*+/=?^_\`{|}~-]+)*` + // Caracteres permitidos después de la @ (dominio)
//     `@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\\.)+[a-zA-Z0-9_-]*$` // Verifica el formato del dominio
// )
const USER_EMAIL_REGEXP = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i

export class UserEmail extends StringValueObject {
  constructor(override readonly value: string) {
    super(value)

    this.#ensureEmailIsValid(value)
  }

  toPrimitives(): string {
    return this.value
  }

  #ensureEmailIsValid(value: string): void {
    if (!USER_EMAIL_REGEXP.test(value)) {
      throw new InvalidArgumentError(`<${value}> is not a valid email`)
    }
  }
}
