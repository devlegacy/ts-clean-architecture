import {
  container,
} from 'tsyringe'

import {
  EnvironmentArranger,
  MikroOrmMongoEnvironmentArranger,
} from '#@/tests/Contexts/Shared/infrastructure/index.js'

import {
  TYPES,
} from '../types.js'

export * from './container.js'

// Test
container.register<EnvironmentArranger>(TYPES.EnvironmentArranger, MikroOrmMongoEnvironmentArranger)
