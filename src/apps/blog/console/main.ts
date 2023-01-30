import { PostUseCase } from '@/Contexts/Blog/Posts/application/PostUseCase'
import { PostRepository } from '@/Contexts/Blog/Posts/domain'
import { FilePostRepository } from '@/Contexts/Blog/Posts/infrastructure'

import { BlogCLI } from './BlogCLI'

const repository: PostRepository = new FilePostRepository()
const useCase = new PostUseCase(repository)
const cli = new BlogCLI(useCase)

cli.render()
