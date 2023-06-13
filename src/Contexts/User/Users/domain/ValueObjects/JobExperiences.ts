import { InvalidArgumentError } from '@/Contexts/Shared/domain'

import { JobExperience, JobExperiencePrimitiveType } from './JobExperience'

export type JobExperiencesPrimitiveType = Primitives<JobExperiences>
export type JobExperiencesEntityType = Entity<JobExperiences>

export class JobExperiences {
  // readonly value: JobExperience[]

  constructor(readonly value: JobExperience[]) {
    this.#ensureNoOverlappingExperiences(value)

    // this.value = experiences
    // this.value = experiences
  }

  static fromPrimitives(experiences: JobExperiencePrimitiveType[]) {
    const jobExperiences = experiences.map((experience) =>
      JobExperience.fromPrimitives({
        company: experience.company,
        title: experience.title,
        dateRange: experience.dateRange,
      })
    )

    return new JobExperiences(jobExperiences)
  }

  #ensureNoOverlappingExperiences(experiences: JobExperience[]) {
    const sortedExperiences = experiences.sort((a, b) => a.startDate.getTime() - b.startDate.getTime())

    for (let i = 0; i < sortedExperiences.length - 1; i++) {
      const currentExperience = sortedExperiences[+i]
      const nextExperience = sortedExperiences[i + 1]

      if (!currentExperience.endDate) {
        continue
      }

      if ((currentExperience.endDate.getTime() ?? new Date().getTime()) > nextExperience.startDate.getTime()) {
        throw new InvalidArgumentError(
          `The job experience at ${
            currentExperience.company.value
          } from ${currentExperience.startDate.toString()} to ${currentExperience.endDate.toString()} overlaps with the job experience at ${
            nextExperience.company.value
          } from ${nextExperience.startDate.toString()} to ${nextExperience.endDate?.toString() ?? ''}`
        )
      }
    }
  }
}
