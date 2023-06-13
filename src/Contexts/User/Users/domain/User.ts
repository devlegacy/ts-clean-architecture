import { AggregateRoot } from '@/Contexts/Shared/domain'

import { UserId } from '../../Shared/domain'
import {
  Generation,
  GenerationName,
  JobExperiences,
  UserAge,
  UserBirthdate,
  UserEmail,
  UserName,
  UserUsername,
} from './ValueObjects'

// NOTE: No acoplar a un modelo

// export interface User {
//   id: string
//   name: string
//   username: string
//   age: number
// }

// export interface UserUpdateDto extends Omit<Partial<User>, 'id'> {
//   id: User['id']
// }

export type UserPrimitiveType = Primitives<User>
export type UserEntityType = Entity<User>

export class User extends AggregateRoot {
  readonly id: UserId
  readonly name: UserName
  readonly username: UserUsername
  readonly birthdate: UserBirthdate
  readonly age?: UserAge
  readonly jobExperiences: JobExperiences

  private _email: UserEmail

  get email() {
    return this._email
  }

  constructor(
    id: UserId,
    name: UserName,
    username: UserUsername,
    email: UserEmail,
    birthdate: UserBirthdate,
    jobExperiences: JobExperiences,
    age?: UserAge
  ) {
    super()
    this.id = id
    this.name = name
    this.username = username
    this._email = email
    this.birthdate = birthdate
    this.jobExperiences = jobExperiences
    this.age = age
  }

  static override fromPrimitives(data: UserPrimitiveType): User {
    // return new Course({
    //   id: new CourseId(props.id),
    //   name: new CourseName(props.name),
    //   duration: !props.duration ? undefined : new CourseDuration(props.duration)
    // })
    return new User(
      new UserId(data.id),
      new UserName(data.name),
      new UserUsername(data.username),
      new UserEmail(data.email),
      new UserBirthdate(data.birthdate),
      new JobExperiences(data.jobExperiences),
      !data.age ? undefined : new UserAge(data.age)
    )
  }

  updateEmail(email: User['email']) {
    this._email = email
  }

  toPrimitives(): UserPrimitiveType {
    return {
      id: this.id.value,
      name: this.name.value,
      username: this.username.value,
      email: this._email.value,
      birthdate: this.birthdate.value,
      jobExperiences: this.jobExperiences.value,
      age: this.age?.value,
    }
  }

  generation(): Generation {
    return this.birthdate.generation()
  }

  isMillennial() {
    return this.birthdate.generation() === GenerationName.Millennial
  }

  // Tell don't ask
  // isAdult() {}

  // Tell don't ask
  // isBirthday() {}
}
