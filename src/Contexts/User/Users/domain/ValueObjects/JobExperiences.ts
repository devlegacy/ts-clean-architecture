import { InvalidArgumentError } from '@/Contexts/Shared/domain'

import { JobExperience, JobExperiencePrimitiveType } from './JobExperience'

export type JobExperiencesPrimitiveType = Primitives<JobExperiences>
export type JobExperiencesEntityType = Entity<JobExperiences>

export class JobExperiences extends Array<JobExperience> {
  // readonly value: JobExperience[]

  constructor(experiences: JobExperiencePrimitiveType[]) {
    const jobExperiences = experiences.map((experience) => JobExperience.fromPrimitives(experience))
    super(...jobExperiences)

    // super()
    // const jobExperiences = experiences.map((experience) => {
    //   const jobExperience = JobExperience.fromPrimitives(experience)
    //   this.push(jobExperience)
    //   return jobExperience
    // })

    this.#ensureNoOverlappingExperiences(jobExperiences)

    // this.value = jobExperiences
  }

  // Note: Required to make the class work as an array
  static get [Symbol.species]() {
    return Array
  }

  static fromPrimitives(experiences: JobExperiencePrimitiveType[]) {
    return new JobExperiences(experiences)
  }

  toPrimitives() {
    // return Array.from(this).map((experience) => experience.toPrimitives())
    // return this.length ? this.map((experience) => experience.toPrimitives()) : this
    // return Array.prototype.map.call(this, (experience) => experience.toPrimitives())
    return this.map((experience) => experience.toPrimitives())
  }

  #ensureNoOverlappingExperiences(experiences: JobExperience[]) {
    const sortedExperiences = experiences.sort((a, b) => a.startDate().getTime() - b.startDate().getTime())

    for (let i = 0; i < sortedExperiences.length - 1; i++) {
      const currentExperience = sortedExperiences[+i]
      const nextExperience = sortedExperiences[i + 1]

      if (!currentExperience.endDate) {
        continue
      }

      if ((currentExperience.endDate()?.getTime() ?? new Date().getTime()) > nextExperience.startDate().getTime()) {
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
