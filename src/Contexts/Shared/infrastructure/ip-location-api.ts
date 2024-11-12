import {
  lookup,
} from 'ip-location-api'

// ILA_FIELDS=all ILA_ADD_COUNTRY_INFO=true node./node_modules/ip-location-api/script/updatedb.mjs

const ip = '207.97.227.239'
const location = lookup(ip)
// eslint-disable-next-line no-console
console.log(location)
// node --env-file=.env --experimental-transform-types ./src/Contexts/Shared/infrastructure/ip-location-api.ts
