// publisher utils
export const WAIT_MS = 400
export const MESSAGES_COUNTER = 6

export const wait = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms)
  })

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

// subscriber utils
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

const increaseBackOffTimeInSeconds = (currentBackOffTimeInSeconds: number) => currentBackOffTimeInSeconds * 2
const calculateBackOffDelayInMilliseconds = (backOffTimeInSeconds: number) =>
  1000 * (backOffTimeInSeconds + Math.random())

export const backOff =
  /**
   *
   * @param minTimeInSeconds - Min time before to do a request (wait until)
   * @returns
   */


    (minTimeInSeconds: number) =>
    /**
     *
     * @param maxTimeInSeconds - To exit
     * @returns
     */
    (maxTimeInSeconds: number) =>
    /**
     *
     * @param cb - callback to execute like send a message
     * @param onErrorEnd - important, on exit function when back off will finish
     * @param onSuccess
     * @param onError
     * @returns
     */
    (
      cb: (...args: any[]) => Promise<any>,
      onErrorEnd?: (err: any, ...args: any[]) => void,
      onSuccess?: (...args: any[]) => void,
      onError?: (...args: any[]) => void
    ) => {
      const _run =
        (currentSecondsTime: number) =>
        (...args: any[]) => {
          setTimeout(async () => {
            try {
              const result = await cb(...args)

              if (onSuccess) {
                onSuccess(result)
              }
            } catch (error) {
              console.log('args - message', args[2], args)
              if (currentSecondsTime >= maxTimeInSeconds) {
                if (onErrorEnd) {
                  onErrorEnd(error, ...args)
                }
                return
              }

              if (onError) {
                onError(error)
              }

              _run(increaseBackOffTimeInSeconds(currentSecondsTime))(...args)
            }
          }, calculateBackOffDelayInMilliseconds(currentSecondsTime))
        }

      return _run(minTimeInSeconds)
    }

// const p = () =>
//   new Promise((resolve, reject) =>
//     setTimeout(() => {
//       if (Math.random() > 0.4) { // 60% (?)
//         reject(new Error('Fail!!'))
//         return
//       }

//       resolve('Work!')
//     }, 300)
//   )

// const pBackoff = backOff(1)(4)(p, (error) => console.log('END with Errors!', error), console.log, console.error)

// pBackoff()
