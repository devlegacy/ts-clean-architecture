/// <reference types="../../../../../../types"/>
import { Given, Then } from '@cucumber/cucumber'
import assert from 'assert'
import { Response, Test } from 'supertest'

import { api } from './hooks.steps'

let request: Test
let response: Response

Given('I send a GET request to {string}', (route: string) => {
  request = api.get(route)
})

Then('the response status code should be {int}', async (status: number) => {
  response = await request.expect(status)
})

Then('the response should be:', async (res) => {
  const expectedResponse = JSON.parse(res)
  response = await request
  assert.deepStrictEqual(response.body, expectedResponse)
})
