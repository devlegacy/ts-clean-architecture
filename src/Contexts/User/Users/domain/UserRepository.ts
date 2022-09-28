import { Nullable } from '@/Contexts/Shared/domain'

import { User } from './User'

export interface UserRepository {
  getAll: () => Promise<User[]>
  save: (user: User) => Promise<void>
  findByUserName: (username: User['username']) => Promise<Nullable<User>> // TODO: Criteria pattern
  findById: (id: string) => Promise<Nullable<User>> // TODO: Criteria pattern
  update: (user: User, userUpdate: User) => Promise<User>
  delete: (id: string) => Promise<void>
  softDelete: (id: string) => Promise<void>
  // async findByMatching(): Promise<User[]> {
}
