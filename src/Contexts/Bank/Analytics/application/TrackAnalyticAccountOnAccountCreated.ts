import type {
  DomainEventSubscriber,
} from '#@/src/Contexts/Shared/domain/index.js'

import {
  AccountCreatedDomainEvent,
} from '../../Accounts/domain/index.js'
import {
  AnalyticAccountTrackerUseCase,
} from './AnalyticAccountTrackerUseCase.js'

// DomainEventSubscriber | Subscriptor | EventHandler
export class TrackAnalyticAccountOnAccountCreated implements DomainEventSubscriber<AccountCreatedDomainEvent> {
  constructor(private readonly useCase: AnalyticAccountTrackerUseCase) {}

  subscribedTo() {
    return [
      AccountCreatedDomainEvent,
    ]
  }

  // handle
  async on(domainEvent: AccountCreatedDomainEvent): Promise<void> {
    await this.useCase.trackNewAccount(
      domainEvent.aggregateId,
      domainEvent.balance.currency,
    )
  }
}
