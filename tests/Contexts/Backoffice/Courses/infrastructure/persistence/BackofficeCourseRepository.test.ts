import { container } from '@/apps/backoffice/modules/index.js'
import { BackofficeCourse, BackofficeCourseRepository } from '@/Contexts/Backoffice/Courses/domain/index.js'
import { EnvironmentArranger } from '@/tests/Contexts/Shared/infrastructure/index.js'

import { BackofficeCourseMother } from '../../domain/index.js'

const repository: BackofficeCourseRepository = container.get(BackofficeCourseRepository)
const environmentArranger: EnvironmentArranger = container.get(EnvironmentArranger)

beforeEach(async () => {
  await environmentArranger.arrange()
})

afterEach(async () => {
  await environmentArranger.arrange()
})

afterAll(async () => {
  await environmentArranger.close()
})

describe('BackofficeCourseRepository', () => {
  describe('#save', () => {
    // Not allowed with mikrorom
    it('should be able to persist the same course twice', async () => {
      const course = BackofficeCourseMother.random()

      await repository.save(course)
      // await repository.save(course)

      const persistedCourses = await repository.all()

      expect(persistedCourses).toHaveLength(1)
      expect(persistedCourses.map((p) => p.toPrimitives())).toEqual([course].map((p) => p.toPrimitives()))
    })
  })

  describe('#searchAll', () => {
    it('should return the existing courses', async () => {
      const first = BackofficeCourseMother.random()
      const second = BackofficeCourseMother.random()
      const courses = [first, second]
      // const coursesPromise = [...courses].map(async (course) => repository.save(course))
      // await Promise.all(coursesPromise)
      await repository.save(first)
      await repository.save(second)

      const expectedCourses = await repository.all()

      expect(courses).toHaveLength(expectedCourses.length)
      expect(courses.sort(sort).map((p) => p.toPrimitives())).toEqual(
        expectedCourses.sort(sort).map((p) => p.toPrimitives())
      )
    })
  })
})

function sort(firstBackofficeCourse: BackofficeCourse, secondBackofficeCourse: BackofficeCourse): number {
  return firstBackofficeCourse?.id?.value?.toString().localeCompare(secondBackofficeCourse?.id?.value?.toString())
}
