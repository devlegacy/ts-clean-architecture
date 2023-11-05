import type { SASLOptions } from 'kafkajs'

export type ConnectionSettings = {
  clientId: string
  brokers: string[]
  sasl: SASLOptions
  ssl: boolean
}
