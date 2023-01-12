// 404
export class EntityNotFoundException extends Error {
  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
  }
}
