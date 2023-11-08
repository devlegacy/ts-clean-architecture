import { createHash } from 'node:crypto'
import { URL } from 'node:url'

import { InvalidArgumentError } from '@/Contexts/Shared/domain/index.js'

const VALID_EMAIL_REGEXP = /\S+@\S+\.\S+/
const gravatarUrl = new URL('https://s.gravatar.com/avatar')
const defaultAvatar = new URL(process.env.DEFAULT_AVATAR_URL || 'http://www.gravatar.com/avatar/?d=identicon')

export class Gravatar {
  readonly value: string

  constructor(email: string) {
    this.ensureEmailIsValid(email)
    // this.value = email ?? (throw new InvalidArgumentError('The email should not be empty'))
    this.value = this.gravatarFromEmail(email)
  }

  // static from() {}
  // static fromNullable() {}

  private gravatarFromEmail(email: string): string {
    const trimmedEmail = email.toLowerCase().trim()
    const hash = createHash('md5').update(trimmedEmail).digest('hex')
    gravatarUrl.searchParams.set('s', '480') // size
    gravatarUrl.searchParams.set('r', 'pg') // rating
    gravatarUrl.searchParams.set('d', defaultAvatar.toString()) // default
    gravatarUrl.pathname += `/${hash}`

    return gravatarUrl.toString()
  }

  private ensureEmailIsValid(value: string): void {
    if (!VALID_EMAIL_REGEXP.test(value)) {
      throw new InvalidArgumentError(`<${value}> is not a valid email`)
    }
  }
}

// console.log(new Gravatar('srojas@domain.com'))
