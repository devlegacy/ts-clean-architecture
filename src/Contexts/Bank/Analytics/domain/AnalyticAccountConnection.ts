export class AnalyticAccountConnection {
  private startedAt: Date

  constructor(startedAt?: Date) {
    this.startedAt = startedAt || new Date()
  }

  static fromPrimitives(
    data: ReturnType<typeof AnalyticAccountConnection.prototype.toPrimitives>,
  ): AnalyticAccountConnection {
    const connection = new AnalyticAccountConnection()
    connection.startedAt = new Date(data.startedAt)
    return connection
  }

  toPrimitives() {
    return {
      startedAt: this.startedAt.getTime(),
    }
  }
}
