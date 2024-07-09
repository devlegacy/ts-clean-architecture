describe('Sample', () => {
  it('Should resolve first sample test', () => {
    expect(true).toBeTruthy()
  })
})

// npx jest --config ./jest.config.mjs ./tests/sample.jest.test.ts
// node --experimental-vm-modules node_modules/jest/bin/jest.js --config ./jest.config.mjs ./tests/sample.jest.test.ts
// NODE_OPTIONS="$NODE_OPTIONS --experimental-vm-modules" npx jest --config ./jest.config.mjs ./tests/sample.jest.test.ts
