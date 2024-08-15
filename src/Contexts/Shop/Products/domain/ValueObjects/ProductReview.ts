import {
  PositiveNumberValueObject,
  StringValueObject,
} from '#@/src/Contexts/Shared/domain/index.js'
import {
  UserId,
} from '#@/src/Contexts/User/Shared/domain/index.js'

export type ProductReviewPrimitiveType = Primitives<ProductReview>
export type ProductReviewEntityType = Entity<ProductReview>

export class ProductReview {
  readonly userId: UserId
  readonly rating: PositiveNumberValueObject
  readonly comment: StringValueObject

  constructor(userId: string, rating: number, comment: string) {
    this.userId = new UserId(userId)
    this.rating = new PositiveNumberValueObject(rating)
    this.comment = new StringValueObject(comment)
  }
}
