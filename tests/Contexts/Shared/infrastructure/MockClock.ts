import assert from 'node:assert/strict'
import {
  type Mock,
  mock,
} from 'node:test'

import type {
  Clock,
} from '#@/src/Contexts/Shared/domain/Clock.js'

export class MockClock implements Clock {
  private readonly mockNow: Mock<Clock['now']> = mock.fn()

  now(): Date {
    // expect(this.mockNow).toHaveBeenCalledWith()
    assert.deepEqual(this.mockNow.mock.calls[0]?.arguments?.at(0), undefined)
    return this.mockNow()
  }

  shouldGenerate(date: Date): void {
    this.mockNow()
    // this.mockNow.mockReturnValueOnce(date)
    // assert.strictEqual(this.mockNow, date)
    this.mockNow.mock.mockImplementationOnce(() => date)
  }
}
