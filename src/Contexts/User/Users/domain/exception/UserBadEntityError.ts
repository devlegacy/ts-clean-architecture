export class UserBadEntityError extends Error {
  constructor() {
    super('User with bad entity')
  }
}
