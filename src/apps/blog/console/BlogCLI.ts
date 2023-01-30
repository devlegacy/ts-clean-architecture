import * as readline from 'readline-sync'

import { PostUseCase } from '@/Contexts/Blog/Posts/application'
import { Post, PostCollection } from '@/Contexts/Blog/Posts/domain'
import { Uuid } from '@/Contexts/Shared/domain'

type Callback = (onSuccess: () => void, onError: (err: Error) => void) => void

export class BlogCLI {
  private readonly options: Callback[]

  constructor(private readonly useCase: PostUseCase) {
    this.options = [this.publishPost.bind(this), this.readPost.bind(this)]
  }

  render() {
    const options = this.options
      .map((option, index) => `\t${index + 1}) ${option.name.replace('bound ', '')}`)
      .join('\n')
    const message = `
      Welcome to our Blog!
      Please, choose an option:
      ${options}`
    console.log(message)

    const optionSelected = Number(readline.question('Option: '))
    this.options[optionSelected - 1](this.render.bind(this), this.onError.bind(this))
  }

  private onError(err: Error) {
    console.log('Something failed, please try again...')
    console.error(err)
  }

  private publishPost(onSuccess: Parameters<Callback>['0'], onError: Parameters<Callback>['1']) {
    const author = readline.question('What is your name? ')
    const content = readline.question(`${author}. What are you thinking? `)

    this.useCase
      .publishPost(Uuid.random().value, author, content, new Date().getTime())
      .then(() => {
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
          console.log(`
          ${post.author} said:
          ${new Date(post.date).toISOString()}
          ${post.content}
        `)
        )
      )
      .catch(onError)
      .finally(onSuccess)
  }
}
// npx tsnd -r ts-node/register/transpile-only -r tsconfig-paths/register ./src/apps/blog/console/main.ts
