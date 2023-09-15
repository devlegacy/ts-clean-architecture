import { User } from './User.js'

// ¿Cómo definimos/extraemos las interfaces? -> Por los clientes que las implementan
// Role interface - ✅ Role de User - Ser repositorio de Usuario - A bd, memoria, etc. - Agnóstico a implementación
//    Casos de uso reales
// Header interface - ❌ ¿Qué ya tengo en código implemento? y pasar a Interfaz como Cabeceras
//    No métodos de implementación
// Nos interesa comportamiento

// Avoid IUserRepository | UserRepositoryInterface
// Avoid method explosion
export abstract class UserRepository {
  abstract save(user: User): Promise<void>
  abstract update(user: User): Promise<void> // Debería retornar <void>
  // ❌ structural coupling - header interface based on MongoDB requirements
  // abstract delete(_id: string): Promise<void>
  // ✅ Role interface based on User domain requirements
  abstract delete(id: string): Promise<void>
  abstract softDelete(id: string): Promise<void>
  // structural coupling, probably empty implementation and test with special implementations, it could be an smell
  // flush(user: User): Promise<void>

  // header interface
  abstract searchAll(): Promise<User[]> // searchAll()
  // No genera excepciones o errores y devuelve nulos
  // Find - Search - Search existe como parte del modulo find
  // abstract search(): Promise<User> // searchAll()
  // header interface - coupling ❌ - leak de infrastructure (username: string) <-> (User[username]: string)
  abstract findByUsername(username: User['username']): Promise<Nullable<User>> // TODO: Convert to criteria pattern
  abstract findByEmail(email: User['email']): Promise<Nullable<User>> // TODO: Convert to criteria pattern
  abstract searchById(id: User['id']): Promise<Nullable<User>> // TODO: Convert to criteria pattern
  // async findByMatching(): Promise<User[]>
}

// class MysqlUserRepository extends UserRepository {}
