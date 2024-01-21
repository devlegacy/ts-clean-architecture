import amqplib, { type ConsumeMessage } from 'amqplib'

// publisher utils
export const WAIT_MS = 400
export const MESSAGES_COUNTER = 6

export const wait = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms)
  })

export const waitLoop = async (loops: number, cb: () => void) => {
  while (loops--) {
    await wait(WAIT_MS)
    console.log(`⏲️  waited ${WAIT_MS}ms`)
    cb()
  }
}

export const exitAfterSend = async () => {
  await wait(MESSAGES_COUNTER * WAIT_MS * 1.2)
  process.exit(0)
}

// subscriber utils
export const intensiveOperation = () => {
  // let i = 1e9
  // while (i--) {
  //   // do something
  // }
  const startAt = process.uptime()
  const maxDifficulty = 10 ** (process.env.DIFFICULTY ? Number(process.env.DIFFICULTY) : 9)

  const minDifficulty = Math.floor(maxDifficulty * 0.8)

  let i = minDifficulty + Math.floor(Math.random() * (maxDifficulty - minDifficulty))

  // let result = 0
  while (i--) {
    // do nothing as a intensive operation
    // result += Math.sin(i) * Math.cos(i)
  }
  const endAt = process.uptime()
  console.log(`⚡️ intensive operation finished in ${endAt - startAt}s`)
}

const increaseBackOffTimeInSeconds = (currentBackOffTimeInSeconds: number) => currentBackOffTimeInSeconds * 2
const calculateBackOffDelayInMilliseconds = (backOffTimeInSeconds: number) =>
  1000 * (backOffTimeInSeconds + Math.random())

export const backOff =
  /**
   *
   * @param minTimeInSeconds - Min time before to do a request (wait until)
   * @returns
   */


    (minTimeInSeconds: number) =>
    /**
     *
     * @param maxTimeInSeconds - To exit
     * @returns
     */
    (maxTimeInSeconds: number) =>
    /**
     *
     * @param cb - callback to execute like send a message
     * @param onErrorEnd - important, on exit function when back off will finish
     * @param onSuccess
     * @param onError
     * @returns
     */
    (
      cb: (...args: any[]) => Promise<any>,
      onErrorEnd?: (err: any, ...args: any[]) => void,
      onSuccess?: (...args: any[]) => void,
      onError?: (...args: any[]) => void,
    ) => {
      const _run =
        (currentSecondsTime: number) =>
        (...args: any[]) => {
          setTimeout(async () => {
            try {
              const result = await cb(...args)

              if (onSuccess) {
                onSuccess(result)
              }
            } catch (error) {
              console.log('args - message', args[2], args)
              if (currentSecondsTime >= maxTimeInSeconds) {
                if (onErrorEnd) {
                  onErrorEnd(error, ...args)
                }
                return
              }

              if (onError) {
                onError(error)
              }

              _run(increaseBackOffTimeInSeconds(currentSecondsTime))(...args)
            }
          }, calculateBackOffDelayInMilliseconds(currentSecondsTime))
        }

      return _run(minTimeInSeconds)
    }

// const p = () =>
//   new Promise((resolve, reject) =>
//     setTimeout(() => {
//       if (Math.random() > 0.4) { // 60% (?)
//         reject(new Error('Fail!!'))
//         return
//       }

//       resolve('Work!')
//     }, 300)
//   )

// const pBackoff = backOff(1)(4)(p, (error) => console.log('END with Errors!', error), console.log, console.error)

// pBackoff()

interface Binding {
  source: string
  vhost: string
  destination: string
  destination_type: string
  routing_key: string
  arguments: Record<string, unknown>
  properties_key: string
}
interface ExchangeInfo {
  name: string
  type: string
  durable: boolean
  auto_delete: boolean
  internal: boolean
  arguments: Record<string, unknown>
}

const RABBITMQ_HOST = 'http://localhost:15672'
const RABBITMQ_API_URL = `${RABBITMQ_HOST}/api`
const RABBITMQ_USER = 'guest'
const RABBITMQ_PASSWORD = 'guest'

export const rabbitConnection = async () => {
  const connection = await amqplib.connect('amqp://localhost')
  // la velocidad de envío de mensajes es alta, pero sin la garantía de que los mensajes lleguen con éxito.
  // const channel = await connection.createChannel()
  const channel = await connection.createConfirmChannel()
  channel.prefetch(1)

  const onMessage = (message: ConsumeMessage, queue?: string) => {
    if (!message) return
    console.log(message)
    const content = JSON.parse(message.content.toString())
    intensiveOperation()
    console.log(`Received message from <${queue}> queue`, content)
    // con el noAck pueden haber duplicados
    channel.ack(message) // confirm and delete
  }

  return {
    connection,
    channel,
    onMessage,
  }
}

export async function rabbitGetQueueBindings(queueName: string): Promise<Binding[]> {
  const vhost = encodeURIComponent('/') // Default vhost, encoded as needed for URLs
  const encodedQueueName = encodeURIComponent(queueName)

  const url = `${RABBITMQ_API_URL}/queues/${vhost}/${encodedQueueName}/bindings`
  const response = await fetch(url, {
    headers: {
      Authorization: `Basic ${Buffer.from(`${RABBITMQ_USER}:${RABBITMQ_PASSWORD}`).toString('base64')}`,
    },
  })
  const bindings: Binding[] = await response.json()
  return bindings
}

export async function getExchangeBindings(exchangeName: string): Promise<Binding[]> {
  const user = 'guest'
  const pass = 'guest'
  const rabbitmqHost = 'http://localhost:15672'
  const vhost = encodeURIComponent('/')

  const url = `${rabbitmqHost}/api/exchanges/${vhost}/${exchangeName}/bindings/source`

  const response = await fetch(url, {
    headers: {
      Authorization: `Basic ${Buffer.from(`${user}:${pass}`).toString('base64')}`,
    },
  })

  const bindings: Binding[] = await response.json()

  return bindings
}

export async function getExchangeInfo(exchangeName: string): Promise<ExchangeInfo> {
  const user = 'guest'
  const pass = 'guest'
  const rabbitmqHost = 'http://localhost:15672'
  const vhost = encodeURIComponent('/')

  const url = `${rabbitmqHost}/api/exchanges/${vhost}/${exchangeName}`

  const response = await fetch(url, {
    headers: {
      Authorization: `Basic ${Buffer.from(`${user}:${pass}`).toString('base64')}`,
    },
  })

  const exchangeInfo: ExchangeInfo = await response.json()

  return exchangeInfo
}
