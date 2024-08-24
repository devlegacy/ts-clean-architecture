import * as readline from 'readline-sync'

import {
  PostUseCase,
} from '#@/src/Contexts/Blog/Posts/application/index.js'
import {
  Post,
  PostCollection,
} from '#@/src/Contexts/Blog/Posts/domain/index.js'
import {
  Uuid,
} from '#@/src/Contexts/Shared/domain/index.js'

type Callback = (onSuccess: () => void, onError: (err: Error) => void) => void

export class BlogCLI {
  private readonly options: Callback[]

  constructor(private readonly useCase: PostUseCase) {
    this.options = [
      this.publishPost.bind(this),
      this.readPost.bind(this),
    ]
  }

  render() {
    const options = this.options
      .map((option, index) => `\t${index + 1}) ${option.name.replace('bound ', '')}`)
      .join('\n')
    const message = `
      Welcome to our CLI Blog!
      Please, choose an option:
      ${options}`
    // eslint-disable-next-line no-console
    console.log(message)

    const optionSelected = Number(readline.question('Option: '))
    const cb = this.options.at(optionSelected - 1)
    if (cb) {
      cb(this.render.bind(this), this.onError.bind(this))
    }
  }

  private onError(err: Error) {
    // eslint-disable-next-line no-console
    console.log('Something failed, please try again...')
    // eslint-disable-next-line no-console
    console.error(err)
  }

  private publishPost(onSuccess: Parameters<Callback>['0'], onError: Parameters<Callback>['1']) {
    const author = readline.question('What is your name? ')
    const content = readline.question(`${author}. What are you thinking? `)

    this.useCase
      .publishPost(Uuid.random().value, author, content, new Date())
      .then(() => {
        // eslint-disable-next-line no-console
        console.log(`Congratulations ${author}. Your post was published!`)
      })
      .catch(onError)
      .finally(onSuccess)
  }

  private readPost(onSuccess: Parameters<Callback>['0'], onError: Parameters<Callback>['1']) {
    const author = readline.question('From whom? ')
    this.useCase
      .readPost(author)
      .then((posts: PostCollection) =>
        posts.map((post: Post) =>
        // eslint-disable-next-line no-console
          console.log(`
          ${post.author} said:
          ${post.date.toISOString()}
          ${post.content}
        `)))
      .catch(onError)
      .finally(onSuccess)
  }
}
// npx tsnd -r ts-node/register/transpile-only -r tsconfig-paths/register ./src/apps/blog/console/main.ts
