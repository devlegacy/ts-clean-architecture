import type { ElasticConfig } from '@/Contexts/Shared/infrastructure/Persistence/elasticsearch/ElasticConfig.js'

import { config } from './config/index.js'

export class ElasticConfigFactory {
  static createConfig(): ElasticConfig {
    return {
      url: config.get('elastic.url'),
      indexName: config.get('elastic.indexName'),
      indexConfig: config.get('elastic.config'),
    }
  }
}
