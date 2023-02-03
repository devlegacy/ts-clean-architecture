import { Nullable } from '@/Contexts/Shared/domain'

import { DataStore } from './DataStore'

export abstract class InMemoryRepository<
  T extends {
    // id: string
    toPrimitives: () => any
    // fromPrimitives:
  }
> {
  protected parser!: (...props: any[]) => T

  protected async find(id: any): Promise<Nullable<T>> {
    const stored = DataStore.find((aggregate) => aggregate.id === id)
    if (!stored) return null

    const aggregate = this.parser(stored)
    return aggregate
  }

  protected async all(query?: keyof T): Promise<T[]> {
    if (!query) return DataStore.map(this.parser)
    const stored = DataStore.filter((item) => this.matchesQuery(item, query))
    return stored.map(this.parser)
  }

  protected async persist(aggregateRoot: T): Promise<void> {
    const storable = aggregateRoot.toPrimitives()
    DataStore.push(storable)
  }

  protected async update(id: any, aggregateRoot: T): Promise<void> {
    // const storable = aggregateRoot.toPrimitives()
    const aggregate = await this.find(id)
    if (!aggregate) {
      await this.persist(aggregateRoot)
      return
    }

    for (const key in aggregateRoot) {
      if (aggregate[`${key}` as keyof T] !== aggregateRoot[`${key}` as keyof T]) {
        aggregate[`${key}` as keyof T] = aggregateRoot[`${key}` as keyof T]
      }
    }

    DataStore.splice(
      DataStore.findIndex((a) => a.id === id),
      1,
      aggregate
    )
  }

  private matchesQuery(item: T, query: any): boolean {
    let match = true
    for (const key in query) {
      match = match && item[key as keyof T] === query[`${key}`]
      if (!match) {
        return false
      }
    }
    return true
  }
}
