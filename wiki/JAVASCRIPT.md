# 🟨 JavaScript | 🟦 TypeScript

## Parameter object + Destructuring

```ts
class Course {
  constructor({ id, name, duration }: {id: string; name: string; duration: string}){}
}
```

## Builder | Factory pattern

```ts
class CourseCreatedDomainEvent {
  create() {
    return new CourseCreatedDomainEvent()
  }
}

class IncrementCourseOnCourseCreated {
  async run() {
    const event = CourseCreatedDomainEvent.create()
    // ...
  }
}
```

## When use or call super in a class

- In override methods only

## Tag Functions

## Named arguments (Named arguments with destructuring)

## Positional arguments
