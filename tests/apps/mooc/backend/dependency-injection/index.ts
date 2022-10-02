import '@/apps/mooc/backend/dependency-injection'

import { container } from 'tsyringe'

import { TYPES } from '@/apps/mooc/backend/dependency-injection/types'
import { EnvironmentArranger, MongoEnvironmentArranger } from '@/tests/Contexts/Shared/infrastructure'

// Test
container.register<EnvironmentArranger>(TYPES.EnvironmentArranger, MongoEnvironmentArranger)
