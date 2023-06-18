// 422
export class InvalidArgumentError extends TypeError {
  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
  }
}
