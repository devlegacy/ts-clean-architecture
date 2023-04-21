import { AggregateRoot } from '@/Contexts/Shared/domain'

export class Price extends AggregateRoot {
  toPrimitives() {
    return {}
  }
}
