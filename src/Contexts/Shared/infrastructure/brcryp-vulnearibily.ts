import bcrypt from 'bcrypt'

const repeat = 72

const firstUserId = (('0'.repeat(repeat)))
const secondUserId = ((`${'0'.repeat(repeat)}1`))

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
