import { Client } from '@elastic/elasticsearch'
import { ResponseError } from '@elastic/transport/lib/errors'
import bodybuilder, { Bodybuilder } from 'bodybuilder'
import { container } from 'tsyringe'

import { AggregateRoot, Criteria, SHARED_TYPES } from '@/Contexts/Shared/domain'

import { HttpStatus } from '../../_Common'
import ElasticConfig from './ElasticConfig'
import { ElasticCriteriaConverter } from './ElasticCriteriaConverter'

interface SearchResult<T> {
  hits: SearchHitsMetadata<T>
}

interface SearchHitsMetadata<T> {
  hits: SearchHit<T>[]
}

type SearchHit<T> = { _source: T }

export abstract class ElasticRepository<T extends AggregateRoot> {
  private readonly criteriaConverter: ElasticCriteriaConverter
  private readonly _client: Promise<Client> = container.resolve(SHARED_TYPES.ElasticClient)
  private readonly config: ElasticConfig = container.resolve(SHARED_TYPES.ElasticConfig)

  constructor() {
    this.criteriaConverter = new ElasticCriteriaConverter()
  }

  protected indexName(): string {
    return this.config.indexName
  }

  protected client(): Promise<Client> {
    return this._client
  }

  protected async searchAllInElastic<D>(unserializer: (data: D) => T): Promise<T[]> {
    const body = bodybuilder().query('match_all')

    return this.searchInElasticWithBuilder(unserializer, body)
  }

  protected async searchByCriteria(criteria: Criteria, unserializer: (data: any) => T): Promise<T[]> {
    const body = this.criteriaConverter.convert(criteria)

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
