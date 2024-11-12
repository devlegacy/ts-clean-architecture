import {
  MongoClient,
} from 'mongodb'

export interface Country {
  name: Name
  tld: string[]
  cca2: string
  ccn3: string
  cca3: string
  independent: boolean
  status: string
  unMember: boolean
  currencies: Currencies
  idd: Idd
  capital: string[]
  altSpellings: string[]
  region: string
  languages: Languages
  translations: { [key: string]: Translation }
  latlng: number[]
  landlocked: boolean
  area: number
  demonyms: Demonyms
  flag: string
  maps: Maps
  population: number
  car: Car
  timezones: string[]
  continents: string[]
  flags: Flags
  coatOfArms: CoatOfArms
  startOfWeek: string
  capitalInfo: CapitalInfo
}

export interface CapitalInfo {
  latlng: number[]
}

export interface Car {
  signs: string[]
  side: string
}

export type CoatOfArms = unknown

export interface Currencies {
  SHP: Shp
}

export interface Shp {
  name: string
  symbol: string
}

export interface Demonyms {
  eng: Eng
}

export interface Eng {
  f: string
  m: string
}

export interface Flags {
  png: string
  svg: string
  alt?: string
}

export interface Idd {
  root: string
  suffixes: string[]
}

export interface Languages {
  eng: string
}

export interface Maps {
  googleMaps: string
  openStreetMaps: string
}

export interface Name {
  common: string
  official: string
  nativeName: NativeName
}

export interface NativeName {
  eng: Translation
}

export interface Translation {
  official: string
  common: string
}

const countryResponse = await fetch(`https://restcountries.com/v3.1/all`)
const countryCollection = await countryResponse.json() as Country[]

const client = new MongoClient('mongodb://localhost:27017/countries', {
  ignoreUndefined: true,
})

await client.connect()
const db = client.db('countries')
const collection = db.collection('countries')

const countries = countryCollection.map((country) => ({
  name: country.name.official,
  code: country.cca2,
  languages: Object.keys(country.languages ?? {}),
  translations: country.translations,
  region: country.region,
  timezones: country.timezones,
  flag_emoji: country.flag,
  flag_alt: country.flags?.alt,
  flag_countryflags: {
    png: `https://www.countryflags.io/${country.cca2.toLowerCase()}/flat/16.png`,
  },
  flag_flagsapi: {
    png: `https://flagsapi.com/${country.cca2}/flat/16.png`,
  },
  flag_flagcdn: {
    ...country.flags,
    alt: undefined,
  },
}))
await collection.deleteMany({})
await collection.insertMany(countries)

// eslint-disable-next-line no-console
console.log(countries)
await client.close()
// node --env-file=.env --experimental-transform-types ./src/Contexts/Shared/infrastructure/rest-countries-v3.ts
