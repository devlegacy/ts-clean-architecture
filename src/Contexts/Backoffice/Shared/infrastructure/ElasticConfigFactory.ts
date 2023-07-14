import ElasticConfig from '@/Contexts/Shared/infrastructure/Persistence/elasticsearch/ElasticConfig'

import { config } from './config'

export class ElasticConfigFactory {
  static createConfig(): ElasticConfig {
    return {
      url: config.get('elastic.url'),
      indexName: config.get('elastic.indexName'),
      indexConfig: config.get('elastic.config'),
    }
  }
}
