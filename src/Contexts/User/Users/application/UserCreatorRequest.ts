import type {
  JobExperiencePrimitiveType,
  //UserPrimitiveType
} from '../domain/index.js'

export interface UserCreatorRequest {
  id: string
  name: string
  username: string
  birthdate: Date
  age?: number | undefined
  jobExperiences: JobExperiencePrimitiveType[]
  email: string
}
