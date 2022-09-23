export abstract class EnumValueObject<T> {
  readonly value: T

  constructor(value: T, readonly validValues: T[]) {
    this.value = value
    this.isValid(value)
  }

  isValid(value: T): void {
    if (!this.validValues.includes(value)) {
      this.throwErrorForInvalidValue(value)
    }
  }

  protected abstract throwErrorForInvalidValue(value: T): void
}
