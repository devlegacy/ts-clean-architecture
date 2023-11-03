import { container } from 'tsyringe'

import { EnvironmentArranger, MikroOrmMongoEnvironmentArranger } from '@/tests/Contexts/Shared/infrastructure/index.js'

import { TYPES } from '../types'

export * from './container'

// Test
container.register<EnvironmentArranger>(TYPES.EnvironmentArranger, MikroOrmMongoEnvironmentArranger)
