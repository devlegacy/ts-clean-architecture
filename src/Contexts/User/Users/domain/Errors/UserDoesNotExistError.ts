import { InvalidArgumentError } from '@/Contexts/Shared/domain'

export class UserDoesNotExistError extends InvalidArgumentError {
  // override message = `The user ${this.email ?? ''} does not exist`

  constructor(email: string) {
    const message = `The user ${email} does not exist`
    super(message)
  }
}
