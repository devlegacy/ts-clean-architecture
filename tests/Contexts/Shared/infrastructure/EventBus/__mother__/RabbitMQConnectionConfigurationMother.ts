export class RabbitMQConnectionConfigurationMother {
  static create() {
    return {
      connectionSettings: {
        username: 'inrfebcy',
        password: 'fW-2oZftiwGmxyznJLP-pF2k01m7_DXw',
        vhost: 'inrfebcy',
        connection: {
          secure: false,
          hostname: 'beaver.rmq.cloudamqp.com',
          port: 5672
        }
      },
      exchangeSettings: { name: '' }
    }
  }
}
