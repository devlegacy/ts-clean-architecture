import { User } from './User'

export interface UserRepository {
  getAll: () => Promise<User[]>
  save: (user: User) => Promise<User>
  getByUserName: (username: string) => Promise<User | null> // TODO: Criteria pattern
  update: (user: User) => Promise<User>
  delete: (user: User) => Promise<void>
  getById: (id: string) => Promise<User | null> // TODO: Criteria pattern
}
