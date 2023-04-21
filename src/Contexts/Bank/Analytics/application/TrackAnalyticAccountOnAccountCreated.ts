import { IDomainEventSubscriber } from '@/Contexts/Shared/domain'

import { AccountCreatedDomainEvent } from '../../Accounts/domain'
import { AnalyticAccountTrackerUseCase } from './AnalyticAccountTrackerUseCase'

// DomainEventSubscriber | Subscriptor | EventHandler
export class TrackAnalyticAccountOnAccountCreated implements IDomainEventSubscriber<AccountCreatedDomainEvent> {
  constructor(private readonly useCase: AnalyticAccountTrackerUseCase) {}

  subscribedTo() {
    return [AccountCreatedDomainEvent]
  }

  // handle
  async on(domainEvent: AccountCreatedDomainEvent): Promise<void> {
    await this.useCase.trackNewAccount(domainEvent.aggregateId, domainEvent.balance.currency)
  }
}
