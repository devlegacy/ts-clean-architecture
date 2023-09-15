import { Company } from './Company.js'
import { DateRange, type DateRangePrimitiveType } from './DateRange.js'
import { Title } from './Title.js'

export type JobExperiencePrimitiveType = Primitives<JobExperience>
export type JobExperienceEntityType = Entity<JobExperience>

export class JobExperience {
  readonly company: Company
  readonly title: Title
  readonly dateRange: DateRange

  constructor(company: string, title: string, dateRange: DateRangePrimitiveType) {
    this.company = new Company(company)
    this.title = new Title(title)
    // Conceptos vs Propiedades
    this.dateRange = DateRange.fromPrimitives(dateRange)
  }

  static fromPrimitives(data: JobExperiencePrimitiveType) {
    return new JobExperience(data.company, data.title, data.dateRange)
  }

  startDate() {
    return this.dateRange.startDate.value
  }

  endDate() {
    return this.dateRange.endDate?.value || null
  }

  toPrimitives() {
    return {
      company: this.company.value,
      title: this.title.value,
      dateRange: this.dateRange.toPrimitives(),
    }
  }
}
