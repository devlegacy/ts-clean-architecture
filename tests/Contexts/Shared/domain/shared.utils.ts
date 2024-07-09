export function wait(milliseconds = 800) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

export class TestUtil {
  static getPackagePath(dirname: string) {
    const path = this
      .getPath(dirname)
      .split('.')
      .slice(0, 2)
      .join('.')
    return path
  }

  static getUnitTestPath(dirname: string, fn: { name: string }) {
    const path = this
      .getPath(dirname)
      .split(this.getPackagePath(dirname))
      .join('')
      .slice(1)
    return `${path}.${fn.name}`
  }

  static getAcceptanceTestPath(dirname: string, title?: string) {
    const path = this
      .getPath(dirname)
      .split(this.getPackagePath(dirname))
      .join('')
      .slice(1)
    return title ? `${path}.${title}` : path
  }

  static wait(milliseconds = 0) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds))
  }

  private static getPath(dirname: string) {
    return dirname
      .split(process.cwd()).join('')
      .split('/tests')
      .join('')
      .split('/')
      .join('.')
      .substring(1)
  }
}

// let throttleTimer: boolean
// const throttle = (callback: () => void, time: number) => {
//   if (throttleTimer) return
//   throttleTimer = true
//   setTimeout(() => {
//     callback()
//     throttleTimer = false
//   }, time)
// }
