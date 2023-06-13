import {
  JobExperience,
  //UserPrimitiveType
} from '../domain'

export interface UserCreatorRequest {
  id: string
  name: string
  username: string
  birthdate: Date
  age?: number | undefined
  jobExperiences: JobExperience[]
  email: string
}
