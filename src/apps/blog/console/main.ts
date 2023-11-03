import { PostUseCase } from '@/Contexts/Blog/Posts/application/PostUseCase.js'
import { PostRepository } from '@/Contexts/Blog/Posts/domain/index.js'
import { FilePostRepository } from '@/Contexts/Blog/Posts/infrastructure/index.js'

import { BlogCLI } from './BlogCLI.js'

const repository: PostRepository = new FilePostRepository()
const useCase = new PostUseCase(repository)
const cli = new BlogCLI(useCase)

cli.render()
