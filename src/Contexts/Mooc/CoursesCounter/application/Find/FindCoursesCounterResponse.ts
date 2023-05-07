export class FindCoursesCounterResponse {
  readonly total: number

  constructor(total: number) {
    this.total = total
  }

  toJSON() {
    return {
      total: this.total,
    }
  }
}
