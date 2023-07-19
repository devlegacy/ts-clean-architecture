import { AggregateRoot, isNil } from '@/Contexts/Shared/domain'

import { UserId } from '../../Shared/domain'
import {
  Generation,
  GenerationName,
  JobExperiencePrimitiveType,
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

  #email: UserEmail

  get email() {
    return this.#email
  }

  constructor(
    id: string,
    name: string,
    username: string,
    email: string,
    birthdate: Date,
    jobExperiences: JobExperiencePrimitiveType[],
    age?: number
  ) {
    super()
    this.id = new UserId(id)
    this.name = new UserName(name)
    this.username = new UserUsername(username)
    this.#email = new UserEmail(email)
    this.birthdate = new UserBirthdate(birthdate)
    this.jobExperiences = new JobExperiences(jobExperiences)
    this.age = isNil(age) ? undefined : new UserAge(age)
  }

  static override fromPrimitives(data: UserPrimitiveType): User {
    // return new Course({
    //   id: new CourseId(props.id),
    //   name: new CourseName(props.name),
    //   duration: !props.duration ? undefined : new CourseDuration(props.duration)
    // })
    return new User(
      data.id,
      data.name,
      data.username,
      data.email,
      data.birthdate,
      data.jobExperiences,
      isNil(data.age) ? undefined : data.age
    )
  }

  updateEmail(email: UserPrimitiveType['email']) {
    this.#email = new UserEmail(email)
  }

  toPrimitives(): UserPrimitiveType {
    return {
      id: this.id.value,
      name: this.name.value,
      username: this.username.value,
      email: this.#email.value,
      birthdate: this.birthdate.value,
      jobExperiences: this.jobExperiences.toPrimitives(),
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
