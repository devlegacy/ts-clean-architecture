import { ObjectId } from 'mongodb'

import { Criteria, Filter, Filters, FilterValue, Operator, Order } from '@/Contexts/Shared/domain'

type MongoFilterOperator = '$eq' | '$ne' | '$gt' | '$lt' | '$regex' | '$exists'
type MongoFilterValue = boolean | string | number | ObjectId
type MongoFilterOperation = { [operator in MongoFilterOperator]?: MongoFilterValue }
type MongoFilter = { [field: string]: MongoFilterOperation | { $not: MongoFilterOperation } }
type MongoDirection = 1 | -1
type MongoSort = { [field: string]: MongoDirection }

type MongoQuery = {
  filter: MongoFilter
  sort: MongoSort
  skip: number
  limit: number
}

type TransformerFunction<T, K> = {
  (value: T): K
}

export class MongoCriteriaConverter {
  private filterTransformers: Map<Operator, TransformerFunction<Filter, MongoFilter>>

  constructor() {
    this.filterTransformers = new Map<Operator, TransformerFunction<Filter, MongoFilter>>([
      [Operator.EQUAL, this.equalFilter],
      [Operator.NOT_EQUAL, this.notEqualFilter],
      [Operator.GT, this.greaterThanFilter],
      [Operator.LT, this.lowerThanFilter],
      [Operator.CONTAINS, this.containsFilter],
      [Operator.NOT_CONTAINS, this.notContainsFilter],
      [Operator.EXISTS, this.existsFilter],
    ])
  }

  public convert(criteria: Criteria): MongoQuery {
    return {
      filter: criteria.hasFilters() ? this.generateFilter(criteria.filters) : {},
      sort: criteria.order.hasOrder() ? this.generateSort(criteria.order) : { _id: -1 },
      skip: criteria.offset || 0,
      limit: criteria.limit || 0,
    }
  }

  protected generateFilter(filters: Filters): MongoFilter {
    const filter = filters.filters.map((filter) => {
      const transformer = this.filterTransformers.get(filter.operator.value)

      if (!transformer) {
        throw Error(`Unexpected operator value <${filter.operator.value}>`)
      }

      return transformer.call(this, filter)
    })

    return Object.assign({}, ...filter)
  }

  protected generateSort(order: Order): MongoSort {
    return {
      [order.orderBy.value === 'id' ? '_id' : order.orderBy.value]: order.orderType.isAsc() ? 1 : -1,
    }
  }

  private getFilterValue(filterValue: FilterValue) {
    if (ObjectId.isValid(filterValue.value)) return new ObjectId(filterValue.value)

    return filterValue.value
  }

  private equalFilter(filter: Filter): MongoFilter {
    return { [filter.field.value]: { $eq: this.getFilterValue(filter.value) } }
  }

  private notEqualFilter(filter: Filter): MongoFilter {
    return { [filter.field.value]: { $ne: this.getFilterValue(filter.value) } }
  }

  private greaterThanFilter(filter: Filter): MongoFilter {
    return { [filter.field.value]: { $gt: this.getFilterValue(filter.value) } }
  }

  private lowerThanFilter(filter: Filter): MongoFilter {
    return { [filter.field.value]: { $lt: this.getFilterValue(filter.value) } }
  }

  private containsFilter(filter: Filter): MongoFilter {
    return { [filter.field.value]: { $regex: this.getFilterValue(filter.value) } }
  }

  private notContainsFilter(filter: Filter): MongoFilter {
    return { [filter.field.value]: { $not: { $regex: this.getFilterValue(filter.value) } } }
  }

  private existsFilter(filter: Filter): MongoFilter {
    return { [filter.field.value]: { $exists: this.getFilterValue(filter.value) === 'true' } }
  }
}
