import { Kafka } from 'kafkajs'

import { ConnectionSettings } from './ConnectionSettings'

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
