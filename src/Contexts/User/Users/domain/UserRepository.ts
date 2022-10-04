import { Nullable } from '@/Contexts/Shared/domain'

import { User } from './User'

export interface UserRepository {
  getAll: () => Promise<User[]>
  save: (user: User) => Promise<void>
  findByUserName: (username: string) => Promise<Nullable<User>> // TODO: Criteria pattern
  findById: (userId: string) => Promise<Nullable<User>> // TODO: Criteria pattern
  update: (user: User, userUpdate: User) => Promise<User>
  delete: (userId: string) => Promise<void>
  softDelete: (userId: string) => Promise<void>
  // async findByMatching(): Promise<User[]>
}
