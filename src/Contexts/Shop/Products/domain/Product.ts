import {
  Money,
} from '#@/src/Contexts/Shared/domain/index.js'

import {
  ProductId,
  ProductImageUrls,
  ProductName,
  type ProductReviewPrimitiveType,
  ProductReviews,
} from './ValueObjects/index.js'

export class Product {
  readonly id: ProductId
  readonly name: ProductName
  readonly price: Money
  readonly imageUrls: ProductImageUrls
  readonly reviews: ProductReviews

  constructor(
    id: string,
    name: string,
    price: { amount: number, currency: string },
    imageUrls: string[],
    reviews: ProductReviewPrimitiveType[],
  ) {
    this.id = new ProductId(id)
    this.name = new ProductName(name)
    this.price = Money.fromPrimitives(price)
    this.imageUrls = new ProductImageUrls(imageUrls)
    this.reviews = new ProductReviews(reviews)
  }

  totalImages(): number {
    return this.imageUrls.total()
  }
}
