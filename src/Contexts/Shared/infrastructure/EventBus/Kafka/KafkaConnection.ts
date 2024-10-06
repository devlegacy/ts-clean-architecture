import {
  Kafka,
} from 'kafkajs'

import type {
  ConnectionSettings,
} from './ConnectionSettings.js'

export class KafkaConnection {
  protected connectionSettings: ConnectionSettings
  protected connection?: Kafka
  constructor(params: { connectionSettings: ConnectionSettings }) {
    this.connectionSettings = params.connectionSettings
  }

  connect() {
    this.connection = new Kafka(this.connectionSettings)
  }
}
