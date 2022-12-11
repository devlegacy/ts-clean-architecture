import { container } from 'tsyringe'

import { CreateCartViewOnCartCreated } from '@/Contexts/Land/CartViews/application'

import { TYPES } from './types'

// Application layer
container
  // 🚌 EventBus <-> EventSubscribers
  // 🏷 Tags - Application
  .register(TYPES.DomainEventSubscriber, CreateCartViewOnCartCreated)
