import { ProductReview, type ProductReviewPrimitiveType } from './ProductReview.js'

export type ProductReviewsPrimitiveType = Primitives<ProductReviews>
export type ProductReviewsEntityType = Entity<ProductReviews>

export class ProductReviews extends Array<ProductReview> {
  constructor(reviews: ProductReviewPrimitiveType[]) {
    const productReviews = reviews.map((review) => new ProductReview(review.userId, review.rating, review.comment))
    super(...productReviews)
  }

  static get [Symbol.species]() {
    return Array
  }
}
