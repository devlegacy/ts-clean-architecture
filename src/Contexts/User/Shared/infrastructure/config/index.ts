import convict from 'convict'
import { resolve } from 'path'

const userConfig = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'staging', 'test'],
    default: 'default',
    env: 'NODE_ENV'
  },
  mongo: {
    url: {
      doc: 'The MongoDB connection URL.',
      format: String,
      env: 'MONGO_URL',
      default: 'mongodb://127.0.0.1:27017/user'
    }
  }
})

userConfig.loadFile([resolve(`${__dirname}/default.json`), resolve(`${__dirname}/${userConfig.get('env')}.json`)])

export default userConfig
