import {
  Redis,
} from 'ioredis'

import {
  ONE_SECOND_IN_MILLISECONDS,
  TEN_SECONDS,
} from '#@/src/Contexts/Shared/domain/time.js'

const client = new Redis({
  host: '127.0.0.1',
  port: 6379,
  password: 'SUPER_SECRET_PASSWORD',
})

try {
  // await client.setex('blocks', TWO_SECONDS, JSON.stringify([])))
  const exists = await client.call('JSON.GET', 'blocks')
  if (!exists) await client.call('JSON.SET', 'blocks', '$', JSON.stringify([]))

  const stored = (await client.call('JSON.GET', 'blocks')) as string | null
  await client.expire('blocks', TEN_SECONDS)

  // eslint-disable-next-line no-console
  console.log(stored, typeof stored)
  // eslint-disable-next-line no-console
  if (stored) console.log(JSON.parse(stored), typeof JSON.parse(stored))
  const interval = setInterval(async () => {
    const stored = (await client.call('JSON.GET', 'blocks')) as string | null
    if (!stored) {
      // eslint-disable-next-line no-console
      console.log('No data stored')
      clearInterval(interval)
      return await client.quit()
    }
    // eslint-disable-next-line no-console
    console.log(JSON.parse(stored), typeof JSON.parse(stored))
  }, ONE_SECOND_IN_MILLISECONDS)
  // await client.quit()
} catch (e) {
  // eslint-disable-next-line no-console
  console.error(e)
}
