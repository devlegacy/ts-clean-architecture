import { container } from 'tsyringe'

import { EnvironmentArranger, MikroOrmMongoEnvironmentArranger } from '@/tests/Contexts/Shared/infrastructure'

import { TYPES } from '../types'

export * from './container'

// Test
container.register<EnvironmentArranger>(TYPES.EnvironmentArranger, MikroOrmMongoEnvironmentArranger)
