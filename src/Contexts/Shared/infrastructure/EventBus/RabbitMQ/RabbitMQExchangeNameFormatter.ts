export class RabbitMQExchangeNameFormatter {
  static retry(exchangeName: string): string {
    return `retry-${exchangeName}`
  }

  static deadLetter(exchangeName: string): string {
    return `dead_letter-${exchangeName}`
  }
}
