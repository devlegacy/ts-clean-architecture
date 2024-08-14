import {
  ObjectIdMother,
} from '../../../domain/ObjectIdMother.js'
import {
  DomainEventDummy,
} from './DomainEventDummy.js'

export class DomainEventDummyMother {
  static random() {
    return new DomainEventDummy({
      aggregateId: ObjectIdMother.random(),
      eventId: ObjectIdMother.random(),
      occurredOn: new Date(),
    })
  }
}
