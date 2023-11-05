import type { SignOptions } from 'jsonwebtoken'
import jwt from 'jsonwebtoken'

import { Uuid } from '../domain/index.js'

const APP_KEY = 'base64:bcf051a576ed6911d39254bf22dc4b580a55f382edaf026adb6334d1f0ac0191'
export const calculateStringSizeInKB = (str: string) => {
  const bytes = Buffer.byteLength(str, 'utf8')
  const kilobytes = bytes / 1024

  return kilobytes
}

type User = { id: string; name: string; email: string; roles: string[] }

const createAccessToken = (user: User): string => {
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    roles: user.roles,
    // text: 'a'.repeat(3000),
  }
  const options: SignOptions = {
    algorithm: 'HS256',
    expiresIn: '15m', // '10s', '4s'
    // subject:,
    // issuer:,
    // audience: ,
  }
  const access_token = jwt.sign(payload, APP_KEY, options)
  console.log(access_token)
  console.log(calculateStringSizeInKB(access_token))
  return access_token
}

const verifyToken = (token: string): Nullable<User> => {
  try {
    const user = jwt.verify(token, APP_KEY)
    return user as User
  } catch (e) {
    return null
  }
}

const token = createAccessToken({
  id: Uuid.random().value,
  name: 'Samuel',
  email: 'jst.samuel@gmail.com',
  roles: ['admin', 'user'],
})
console.log(verifyToken(token))
