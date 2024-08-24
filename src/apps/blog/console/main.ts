import {
  PostUseCase,
} from '#@/src/Contexts/Blog/Posts/application/PostUseCase.js'
import {
  type PostRepository,
} from '#@/src/Contexts/Blog/Posts/domain/index.js'
import {
  FilePostRepository,
} from '#@/src/Contexts/Blog/Posts/infrastructure/index.js'

import {
  BlogCLI,
} from './BlogCLI.js'

const repository: PostRepository = new FilePostRepository()
const useCase = new PostUseCase(repository)
const cli = new BlogCLI(useCase)

cli.render()
