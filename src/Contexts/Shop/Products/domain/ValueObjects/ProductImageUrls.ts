import {
  UrlValueObject,
} from '#@/src/Contexts/Shared/domain/index.js'

export class ProductImageUrls extends Array<UrlValueObject> {
  constructor(urls: string[]) {
    const images = urls.map((url) => new UrlValueObject(url))
    super(...images)
  }

  static get [Symbol.species]() {
    return Array
  }

  toPrimitives(): string[] {
    return this.map((image) => image.value)
  }

  total() {
    return this.length
  }
}

// console.log(new ProductImageUrls(['https://google.com', 'https://google.com']))
// console.log(new ProductImageUrls(['https://google.com', 'https://google.com']).toPrimitives())
