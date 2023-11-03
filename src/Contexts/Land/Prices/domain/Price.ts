import { AggregateRoot } from '@/Contexts/Shared/domain/index.js'

export class Price extends AggregateRoot {
  toPrimitives() {
    return {}
  }
}
