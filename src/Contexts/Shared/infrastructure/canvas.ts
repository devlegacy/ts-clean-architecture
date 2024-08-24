import {
  createCanvas,
} from 'canvas'

// registerFont(resolve(__dirname, './NotoSans-Regular.ttf'), { family: 'NotoSans' })

export function createProfilePicture(text: string) {
  text = text
    .trim()
    .toUpperCase()
    .slice(0, 2)
    .toUpperCase()
  const side = 120
  const canvas = createCanvas(side, side)
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
  return canvas.toBuffer('image/png')
}

// const text = 'sr'
// const outputPath = `./${text}.png`

// console.log(createProfilePicture('sr'))
// writeFile(outputPath, createProfilePicture('sr'), (err) => {
//   if (err) {
//     console.error('Error al guardar la imagen:', err)
//     return
//   }
//   console.log('Imagen guardada con éxito en:', outputPath)
// })
