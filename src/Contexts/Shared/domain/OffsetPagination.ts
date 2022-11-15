export type Pagination = {
  totalPages: number
  perPage: number
  currentPage: number
}

export class OffsetPagination {
  readonly offset?: number

  private startAt: number

  private perPage?: number
  private currentPage?: number

  private total?: number
  private lastPage?: number
  private totalPages?: number

  constructor(page?: number, perPage?: number, startAt = 0) {
    this.startAt = startAt
    this.currentPage = page
    this.perPage = perPage

    if (this.isValidPagination()) {
      this.offset = this.currentPage! > this.startAt ? this.perPage! * (this.currentPage! - this.startAt) : 0
    }
  }

  isValidPagination() {
    return !(this.currentPage === undefined || this.currentPage === null)
  }

  calculatePageNumbersBy(total: number) {
    if (!this.isValidPagination()) return this

    this.total = total
    // Total pages calc
    const pages = Math.ceil(this.total / this.perPage!) || this.startAt
    // Total pages with fix value to handle pagination with start in 0 or 1
    this.lastPage = pages > 0 ? pages - Math.abs(this.startAt - 1) : pages
    this.totalPages = this.startAt === 0 ? this.lastPage + 1 : this.lastPage

    return this
  }

  getPageNumbers(): Pagination | undefined {
    if (!this.isValidPagination()) return

    return {
      currentPage: this.currentPage!,
      perPage: this.perPage!,
      totalPages: this.totalPages ?? 0
    }
  }
}
