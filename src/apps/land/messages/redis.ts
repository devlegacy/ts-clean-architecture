import Redis from 'ioredis'

const client = new Redis({
  host: '127.0.0.1',
  port: 6379,
  password: 'SUPER_SECRET_PASSWORD',
})
const run = async () => {
  // const exists = await client.call('JSON.GET', 'blocks')
  // if (!exists) await client.call('JSON.SET', 'blocks', '$', JSON.stringify([]))
  const stored: any = await client.call('JSON.GET', 'blocks')
  console.log(JSON.parse(stored))
}

run().catch(console.error)
