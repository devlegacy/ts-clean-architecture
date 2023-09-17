export class UserNotFoundError extends Error {
  constructor() {
    super("User doesn't exists")
  }
}
