import crypto from 'node:crypto'

export const sha256 = async (string: string) => {
  const passwordUint8 = new TextEncoder().encode(string)
  const hashBuffer = await crypto.subtle.digest('SHA-256', passwordUint8)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((hash) => hash.toString(16).padStart(2, '0')).join('')
  return {
    digest: hashHex,
    algorithm: 'sha-256',
  }
}
