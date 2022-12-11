import { PostgresConfig } from '@/Contexts/Shared/infrastructure'

import config from '../../config'

const postgresConfig: PostgresConfig = {
  host: config.get('postgres.host'),
  port: config.get('postgres.port'),
  username: config.get('postgres.username'),
  password: config.get('postgres.password'),
  database: config.get('postgres.database')
}

export class PostgresConfigFactory {
  static createConfig(): PostgresConfig {
    return postgresConfig
  }
}
