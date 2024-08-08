import assert from 'node:assert/strict'

import {
  Then,
  When,
} from '@cucumber/cucumber'
import type {
  Response,
  Test,
} from 'supertest'

import {
  api,
} from './hooks.steps.js'

let request: Test
let response: Response

When('I send a GET request to {string}', (route: string) => {
  request = api.get(route)
  // .key('../../../../../shared/key.pem')
  // .cert('../../../../../shared/cert.pem')
  // .trustLocalhost()
  // _request.url = _request.url.replace('http', 'https')
})

Then('the response status code should be {int}', async (status: number) => {
  response = await request.expect(status)
})

When('I send a PUT request to {string} with body:', (route: string, body: string) => {
  request = api.put(route)
  // .trustLocalhost()
  // _request.url = _request.url.replace('http', 'https')

  request.send(JSON.parse(body))
})

Then('the response should be empty', () => {
  assert.deepStrictEqual(response.body, {})
})

Then('the response content should be:', (res) => {
  assert.deepStrictEqual(response.body, JSON.parse(res))
})

// BeforeAll(
//   {
//     timeout: 2 * 5000
//   },
//   async () => {
//     // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
//     environmentArranger = await container.resolve<Promise<EnvironmentArranger>>(TYPES.EnvironmentArranger)
//     await environmentArranger.arrange()

//     application = new MoocBackendApp()
//     await application.start()
//     api = supertest(application.httpServer)
//     // api = request('https://127.0.0.1:8080')
//   }
// )

// AfterAll(async () => {
//   await environmentArranger.close()

//   await application.stop()

//   // TODO: The exit process should be automatic
//   setTimeout(() => {
//     process.exit(0)
//   }, 0)
// })
