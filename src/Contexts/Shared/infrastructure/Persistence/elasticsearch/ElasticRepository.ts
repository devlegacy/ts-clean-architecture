import { Client as ElasticClient } from '@elastic/elasticsearch'
import { ResponseError } from '@elastic/transport/lib/errors.js'
import bodybuilder, { type Bodybuilder } from 'bodybuilder'
import { Service } from 'diod'

import { HttpStatus } from '@/Contexts/Shared/domain/Common/index.js'
import { AggregateRoot, Criteria } from '@/Contexts/Shared/domain/index.js'

import type { ElasticConfig } from './ElasticConfig.js'
import { ElasticCriteriaConverter } from './ElasticCriteriaConverter.js'

interface SearchResult<T> {
  hits: SearchHitsMetadata<T>
}

interface SearchHitsMetadata<T> {
  hits: SearchHit<T>[]
}

type SearchHit<T> = { _source: T }

@Service()
export abstract class ElasticRepository<T extends AggregateRoot> {
  #criteriaConverter: ElasticCriteriaConverter
  #client: Promise<ElasticClient>
  #config: ElasticConfig

  constructor(client: ElasticClient, config: ElasticConfig) {
    this.#criteriaConverter = new ElasticCriteriaConverter()
    this.#client = client as unknown as Promise<ElasticClient>
    this.#config = config
  }

  protected indexName(): string {
    return this.#config.indexName
  }

  protected client(): Promise<ElasticClient> {
    return this.#client
  }

  protected async searchAllInElastic<D>(unserializer: (data: D) => T): Promise<T[]> {
    const body = bodybuilder().query('match_all')

    return this.searchInElasticWithBuilder(unserializer, body)
  }

  protected async matching(criteria: Criteria, unserializer: (data: any) => T): Promise<T[]> {
    const body = this.#criteriaConverter.convert(criteria)

    return this.searchInElasticWithBuilder(unserializer, body)
  }

  protected async persist(id: string, aggregateRoot: T): Promise<void> {
    const client = await this.client()
    const document = { ...aggregateRoot.toPrimitives() }
    await client.index({
      index: this.indexName(),
      id,
      body: document,
      refresh: 'wait_for',
    }) // wait_for wait for a refresh to make this operation visible to search
  }

  private async searchInElasticWithBuilder<D>(unserializer: (data: D) => T, body: Bodybuilder): Promise<T[]> {
    const client = await this.client()

    try {
      const response = await client.search<SearchResult<D>>({
        index: this.indexName(),
        body: body.build(),
      })

      return response.hits.hits.map((hit) =>
        unserializer({
          ...(hit._source as D),
        })
      )
    } catch (e) {
      if (this.isNotFoundError(e)) {
        return []
      }
      throw e
    }
  }

  private isNotFoundError(e: unknown) {
    return this.isResponseError(e) && e.meta.statusCode === HttpStatus.NOT_FOUND
  }

  private isResponseError(e: unknown): e is ResponseError {
    return e instanceof ResponseError
  }
}
