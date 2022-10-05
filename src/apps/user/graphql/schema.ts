import { IExecutableSchemaDefinition, makeExecutableSchema } from '@graphql-tools/schema'
import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'

import resolvers from './resolvers'

const gqlFiles = readdirSync(join(__dirname, './typedefs'))

const schemaDefinition: IExecutableSchemaDefinition = {
  resolvers,
  typeDefs: ''
}

gqlFiles.forEach((file) => {
  schemaDefinition.typeDefs += readFileSync(join(__dirname, './typedefs', file), {
    encoding: 'utf8'
  })
})

const schema = makeExecutableSchema(schemaDefinition)

export default schema
