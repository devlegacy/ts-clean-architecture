# MongoDB

## Atlas

- [Perform advisor](https://cloud.mongodb.com/v2/61ba10a74465e17aa31e97cf#metrics/replicaSet/61ba12eaa5284b193982b5de/advisor)
- [Profiler -> examined:return ratio](https://cloud.mongodb.com/v2/61ba10a74465e17aa31e97cf#metrics/replicaSet/61ba12eaa5284b193982b5de/profiler)
- [Metrics: +Document metrics](https://cloud.mongodb.com/v2/61ba10a74465e17aa31e97cf#host/replicaSet/61ba12eaa5284b193982b5de)

## Index

- [The ESR (Equality, Sort, Range) Rule](https://www.mongodb.com/docs/upcoming/tutorial/equality-sort-range-rule/)

## Map vs Array

- https://www.mongodb.com/community/forums/t/use-map-vs-array-of-embedded-documents/116801

## Nested arrays

- To store data
- If we need pagination, maybe can't be a good idea

## Validation

```js
{
  $jsonSchema: {
    bsonType: 'object',
    title: 'Course Object Validation',
    required: [
      'name',
      'duration'
    ],
    properties: {
      name: {
        bsonType: 'string',
        description: '\'name\' must be a string and is required',
        maxLength: 10
      },
      duration: {
        bsonType: 'string',
        description: '\'duration\' must be a string and is required'
      }
    }
  }
}
```
