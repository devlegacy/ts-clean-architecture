import { Nullable } from '@/Contexts/Shared/domain'

import { User } from './User'

// ¿Cómo definimos las interfaces? -> Por los clientes que las implementan
// Role interface - Role de User ✅ - Ser repositorio de Usuario - A bd, memoria, etc. - Agnóstico a implementación
// Header interface - ¿Qué ya tengo en código implemento? y pasar a Interfaz como Cabeceras

export interface UserRepository {
  // header interface
  all: () => Promise<User[]>
  save: (user: User) => Promise<void>
  // header interface - coupling ❌ - leak de infrastructure (username: string) <-> (User[username]: string)
  findByUserName: (username: string) => Promise<Nullable<User>> // TODO: Criteria pattern
  findById: (userId: string) => Promise<Nullable<User>> // TODO: Criteria pattern
  update: (user: User, userUpdate: User) => Promise<User>
  delete: (userId: string) => Promise<void>
  softDelete: (userId: string) => Promise<void>
  // async findByMatching(): Promise<User[]>
}
