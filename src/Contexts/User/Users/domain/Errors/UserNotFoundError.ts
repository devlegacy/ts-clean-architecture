export class UserDoesNotExistsError extends Error {
  constructor() {
    super("User doesn't exists")
  }
}
