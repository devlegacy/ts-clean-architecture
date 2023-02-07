// 422
export class InvalidArgumentError extends Error {
  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
  }
}
