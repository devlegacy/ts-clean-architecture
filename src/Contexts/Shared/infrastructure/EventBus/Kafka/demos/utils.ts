export const WAIT_MS = 400
export const MESSAGES_COUNTER = 6

export const wait = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms)
  })

export const intensiveOperation = () => {
  // let i = 1e9
  // while (i--) {
  //   // do something
  // }

  const maxDifficulty = 10 ** (process.env.DIFFICULTY ? Number(process.env.DIFFICULTY) : 9)

  const minDifficulty = Math.floor(maxDifficulty * 0.8)

  let i = minDifficulty + Math.floor(Math.random() * (maxDifficulty - minDifficulty))
  while (i--) {
    // do nothing as a intensive operation
  }
}

export const waitLoop = async (loops: number, cb: () => void) => {
  while (loops--) {
    await wait(WAIT_MS)
    cb()
  }
}

export const exitAfterSend = async () => {
  await wait(MESSAGES_COUNTER * WAIT_MS * 1.2)
  process.exit(0)
}
