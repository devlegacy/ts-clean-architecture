import { Buffer } from 'node:buffer'
import { writeFile } from 'node:fs'
import { resolve } from 'node:path'
import { PassThrough } from 'node:stream'
import { fileURLToPath } from 'node:url'

// node --loader ts-node/esm ./src/Contexts/Shared/infrastructure/pureimage.ts
import * as PImage from 'pureimage'

// const __filename = fileURLToPath(import.meta.url)
const __dirname = fileURLToPath(new URL('.', import.meta.url))
const fnt = PImage.registerFont(resolve(__dirname, './Arial.ttf'), 'Arial')
fnt.loadSync()

export async function createProfilePicture(text: string) {
  const passThroughStream = new PassThrough()
  const pngData: Buffer[] = []
  passThroughStream.on('data', (chunk) => pngData.push(chunk))
  passThroughStream.on('end', () => {})

  text = text.trim().toUpperCase().slice(0, 2).toUpperCase()
  const side = 120
  // @ts-expect-error no types for pureimage yet
  const canvas = PImage.make(side, side)
  const ctx = canvas.getContext('2d')

  // background
  ctx.fillStyle = '#7e8c8d'
  ctx.fillRect(0, 0, side, side)

  // text
  ctx.font = '40px Arial'
  ctx.fillStyle = '#ffffff'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, canvas.width / 2, canvas.height / 2)
  // @ts-expect-error no types for pureimage yet
  const stream = await PImage.encodePNGToStream(canvas, passThroughStream)

  console.log(stream, pngData)
  // return canvas.toBuffer('image/png')

  return Buffer.concat(pngData)
}

const bootstrap = async () => {
  console.log(createProfilePicture('sr'))

  const text = 'sr'
  const outputPath = `./${text}.png`

  console.log(createProfilePicture('sr'))
  const buffer = await createProfilePicture('sr')
  writeFile(outputPath, buffer, (err) => {
    if (err) {
      console.error('Error al guardar la imagen:', err)
      return
    }
    console.log('Imagen guardada con éxito en:', outputPath)
  })
}

bootstrap()

// Match.when()
