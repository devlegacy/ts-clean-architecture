// export interface User {
//   id: string
//   name: string
//   username: string
//   age: number
// }
// Note: No acoplar a un modelo

import { AggregateRoot } from '@/contexts/shared/domain/aggregate-root'

// export interface UserUpdateDto extends Omit<Partial<User>, 'id'> {
//   id: User['id']
// }

export class User extends AggregateRoot {
  toPrimitives() {
    return {
      id: this.id,
      name: this.name,
      username: this.username,
      age: this.age
    }
  }

  readonly id: string
  readonly name: string
  readonly username: string
  readonly age?: number

  constructor(id: string, name: string, username: string, age?: number) {
    super()
    this.id = id
    this.name = name
    this.username = username
    this.age = age
  }
}
