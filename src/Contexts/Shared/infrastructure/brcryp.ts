import bcrypt from 'bcrypt'

import {
  sha256,
} from '#@/src/Contexts/Shared/domain/sha256.js'

const repeat = Math.pow(2, 26) // 27 breaks sha256

let repeated = ''
for (let i = 0; i < repeat; i++) {
  repeated += '0'
}

// eslint-disable-next-line no-console
console.log((await sha256(repeated)).digest.length)

const firstUserId = (await sha256(repeated)).digest
const secondUserId = (await sha256(`${repeated}1`)).digest

// Per bcrypt implementation, only the first 72 bytes of a string are used. Any extra bytes are ignored when matching passwords. Note that this is not the first 72 characters. It is possible for a string to contain less than 72 characters, while taking up more than 72 bytes (e.g. a UTF-8 encoded string containing emojis).

// eslint-disable-next-line no-console
console.log({
  firstUserId,
  secondUserId,
})

const firstHash = bcrypt.hashSync(firstUserId, 10)
const secondHash = bcrypt.hashSync(secondUserId, 10)

// eslint-disable-next-line no-console
console.log({
  firstHash,
  secondHash,
})

// eslint-disable-next-line no-console
console.log(bcrypt.compareSync(firstUserId, firstHash), true)
// eslint-disable-next-line no-console
console.log(bcrypt.compareSync(secondUserId, firstHash), false)
// eslint-disable-next-line no-console
console.log(bcrypt.compareSync(firstUserId, secondHash), false)
// eslint-disable-next-line no-console
console.log(bcrypt.compareSync(secondUserId, secondHash), true)
