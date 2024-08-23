// src/ps_crypto.ts
import { pbkdf2, createDecipheriv, createCipheriv } from 'crypto'

const SALT = 'Adobe Photoshop'
const NUM_ITERATIONS = 1000
const KEY_LENGTH = 24
const ALGORITHM = 'des-ede3-cbc'
const IV = Buffer.from('000000005d260000', 'hex')

export const createPSCrypto = async (password: string) => {
  const derivedKey = await new Promise<Buffer>((resolve, reject) => {
    pbkdf2(password, SALT, NUM_ITERATIONS, KEY_LENGTH, 'sha1', (err, key) => {
      if (err) return reject(err)
      resolve(key)
    })
  })

  return {
    cipher: (buf: Buffer) => {
      const cipher = createCipheriv(ALGORITHM, derivedKey, IV)
      return Buffer.concat([cipher.update(buf), cipher.final()])
    },
    decipher: (buf: Buffer) => {
      const decipher = createDecipheriv(ALGORITHM, derivedKey, IV)
      return Buffer.concat([decipher.update(buf), decipher.final()])
    }
  }
}
