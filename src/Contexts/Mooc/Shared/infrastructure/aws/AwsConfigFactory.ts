import type { AwsConfig } from '@/Contexts/Shared/infrastructure/index.js'

import { config } from '../config/index.js'

const awsConfig: AwsConfig = {
  region: config.get('aws.client.region'),
  credentials: {
    accessKeyId: config.get('aws.client.credentials.accessKeyId'),
    secretAccessKey: config.get('aws.client.credentials.secretAccessKey'),
  },
}

export class AwsConfigFactory {
  static createConfig() {
    return awsConfig
  }
}
