export abstract class EnumValueObject<T> {
  readonly value: T

  constructor(value: T, readonly values: T[]) {
    this.value = value
    this.isValid(value)
  }

  isValid(value: T) {
    if (!this.values.includes(value)) this.throwInvalidValueException(value)
  }

  protected abstract throwInvalidValueException(value: T): void
}
