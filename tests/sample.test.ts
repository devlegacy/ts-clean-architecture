import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

describe('Sample', () => {
  it('should resolve first sample test', () => {
    // assert.strictEqual(true, true)
    assert.equal(true, true)
  })
})
// node --test --loader=ts-paths-esm-loader/transpile-only ./tests/sample.test.ts
