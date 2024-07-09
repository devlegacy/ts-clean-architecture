import {
  EventBus,
} from '../../domain/index.js'
import {
  InMemoryAsyncEventBus,
} from './InMemory/index.js'

export class EventBusFactory {
  private static _instance: EventBus

  private constructor() {
    // do nothing
  }

  static get instance(): EventBus {
    if (!this._instance) {
      const bus = new InMemoryAsyncEventBus()
      this._instance = bus
    }

    return this._instance
  }
}
