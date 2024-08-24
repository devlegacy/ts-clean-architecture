import {
  container,
} from 'tsyringe'

import {
  CreateCartViewOnCartCreated,
} from '#@/src/Contexts/Land/CartViews/application/index.js'

import {
  TYPES,
} from '../types.js'

// Application layer
container
  // 🚌 EventBus <-> EventSubscribers
  // 🏷 Tags - Application
  .register(TYPES.DomainEventSubscriber, CreateCartViewOnCartCreated)
