import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { type IExecutableSchemaDefinition, makeExecutableSchema } from '@graphql-tools/schema'

import resolvers from './resolvers/index.js'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const gqlFiles = readdirSync(join(__dirname, './typedefs'))

const schemaDefinition: IExecutableSchemaDefinition = {
  resolvers,
  typeDefs: '',
}

gqlFiles.forEach((file) => {
  schemaDefinition.typeDefs += readFileSync(join(__dirname, './typedefs', file), {
    encoding: 'utf8',
  })
})

const schema = makeExecutableSchema(schemaDefinition)

export default schema
