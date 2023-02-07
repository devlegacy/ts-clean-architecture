// 404
export class EntityNotFoundError extends Error {
  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
  }
}
