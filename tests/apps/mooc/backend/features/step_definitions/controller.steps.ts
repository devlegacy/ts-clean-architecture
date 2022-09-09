/// <reference types="../../../../../../types"/>

import { AfterAll, BeforeAll, Given, Then } from '@cucumber/cucumber'
import assert from 'assert'
import request from 'supertest'

import { MoocBackendApp } from '@/apps/mooc/backend/mooc-backend-app'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

let _request: request.Test
let _response: request.Response
let application: MoocBackendApp
let api: request.SuperTest<request.Test>

Given('I send a GET request to {string}', (route: string) => {
  _request = api
    .get(route)
    // .key('../../../../../shared/key.pem')
    // .cert('../../../../../shared/cert.pem')
    .trustLocalhost()
  _request.url = _request.url.replace('http', 'https')
})

Then('the response status code should be {int}', async (status: number) => {
  _response = await _request.expect(status)
})

Given('I send a PUT request to {string} with body:', (route: string, body: string) => {
  _request = api.put(route).trustLocalhost()
  _request.url = _request.url.replace('http', 'https')

  _request.send(JSON.parse(body))
})

Then('the response should be empty', () => {
  assert.deepStrictEqual(_response.body, {})
})

BeforeAll(
  {
    timeout: 2 * 5000
  },
  async () => {
    application = new MoocBackendApp()

    await application.start()

    api = request(application.httpServer)
    // api = request('https://127.0.0.1:8080')
  }
)

AfterAll(() => {
  application.stop()

  // TODO: The exit process should be automatic
  setTimeout(() => {
    process.exit(0)
  }, 0)
})
