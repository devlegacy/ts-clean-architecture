import { EventBus } from '../../domain'
import { InMemoryAsyncEventBus } from './InMemory'

export class EventBusFactory {
  private static _instance: EventBus

  private constructor() {
    // do nothing
  }

  public static get instance(): EventBus {
    if (!this._instance) {
      const bus = new InMemoryAsyncEventBus()
      this._instance = bus
    }
    return this._instance
  }
}
