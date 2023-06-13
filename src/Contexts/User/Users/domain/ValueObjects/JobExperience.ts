import { Company } from './Company'
import { DateRange } from './DateRange'
import { Title } from './Title'

export type JobExperiencePrimitiveType = Primitives<Omit<JobExperience, 'startDate' | 'endDate'>>
export type JobExperienceEntityType = Entity<Omit<JobExperience, 'startDate' | 'endDate'>>

export class JobExperience {
  readonly company: Company
  readonly title: Title
  readonly dateRange: DateRange

  get startDate(): Date {
    return this.dateRange.startDate.value
  }

  get endDate(): Date | null {
    return this.dateRange.endDate?.value ?? null
  }

  constructor(company: Company, title: Title, dateRange: DateRange) {
    this.company = company
    this.title = title
    this.dateRange = dateRange
  }

  static fromPrimitives(data: JobExperiencePrimitiveType) {
    return new JobExperience(new Company(data.company), new Title(data.title), DateRange.fromPrimitives(data.dateRange))
  }

  toPrimitives() {
    return {
      company: this.company.value,
      title: this.title.value,
      dateRange: this.dateRange.toPrimitives(),
    }
  }
}
