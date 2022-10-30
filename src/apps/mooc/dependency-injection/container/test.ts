import { container } from 'tsyringe'

import { EnvironmentArranger, MongoEnvironmentArranger } from '@/tests/Contexts/Shared/infrastructure'

import { TYPES } from '../types'

export * from './container'

// Test
container.register<EnvironmentArranger>(TYPES.EnvironmentArranger, MongoEnvironmentArranger)
