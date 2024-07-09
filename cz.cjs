const engine = require('cz-conventional-changelog/engine')
const {
  types,
} = require('conventional-commit-types')
const {
  configLoader,
} = require('commitizen')

const config = configLoader.load() || {}
const options = {
  ...config,
  maxLineWidth: config.maxLineWidth || 100,
  maxHeaderWidth: config.maxHeaderWidth || 100,
}

// TIP: type + scope + short description = 100
module.exports = engine({
  ...options,
  types: {
    ...types,
    wip: {
      description: 'A work in progress feature',
      title: 'Work in progress',
    },
  },
})
