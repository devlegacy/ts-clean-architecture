import { EntityNotFoundException } from '@/Contexts/Shared/domain'

export class BackofficeCourseNotFoundException extends EntityNotFoundException {
  constructor() {
    super('Course not found')
  }
}
