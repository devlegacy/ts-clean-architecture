import type { PostgresConfig } from '@/Contexts/Shared/infrastructure/index.js'

import { config } from '../../config/index.js'

const postgresConfig: PostgresConfig = {
  host: config.get('postgres.host'),
  port: config.get('postgres.port'),
  username: config.get('postgres.username'),
  password: config.get('postgres.password'),
  database: config.get('postgres.database'),
}

export class PostgresConfigFactory {
  static createConfig(): PostgresConfig {
    return postgresConfig
  }
}
