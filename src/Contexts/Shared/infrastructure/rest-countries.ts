import {
  MongoClient,
} from 'mongodb'

interface Country {
  name: string
  topLevelDomain: string[]
  alpha2Code: string
  alpha3Code: string
  callingCodes: string[]
  capital: string
  altSpellings: string[]
  region: string
}

const countryResponse = await fetch(`https://api.countrylayer.com/v2/all?access_key=${process.env.COUNTRY_LAYER_ACCESS_KEY}&FullText=true`)
const countryCollection = await countryResponse.json() as Country[]

const client = new MongoClient('mongodb://localhost:27017/countries', {
  ignoreUndefined: true,
})
await client.connect()
const db = client.db('countries')
const collection = db.collection('countries')

const countries = countryCollection.map((country) => ({
  name: country.name, // .nativeName,
  code: country.alpha2Code,
  // languages: country?.languages?.map((language) => language.iso639_1),
  // translations: country.translations,
  region: country.region,
  // timezones: country.timezones,
  flag: `https://www.countryflags.io/${country.alpha2Code.toLowerCase()}/flat/16.png`,
}))
await collection.deleteMany({})
await collection.insertMany(countryCollection)

// eslint-disable-next-line no-console
console.log(countries)
await client.close()
// node --env-file=.env --experimental-transform-types ./src/Contexts/Shared/infrastructure/rest-countries.ts
