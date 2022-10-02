export const SHARED_TYPES = {
  // Infrastructure
  // Config
  config: Symbol.for('config'),
  // Mongo
  MongoConfig: Symbol.for('MongoConfig'),
  MongoClient: Symbol.for('MongoClient'),
  // TypeORM
  TypeOrmConfig: Symbol.for('TypeOrmConfig'),
  TypeOrmClient: Symbol.for('TypeOrmClient'),
  DataSource: Symbol.for('DataSource')
}
