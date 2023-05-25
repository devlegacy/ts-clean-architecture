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
    additionalProperties: false,
    title: 'Course Object Validation',
    required: ['_id', 'name', 'duration'],
    properties: {
      _id: {
        bsonType: 'objectId',
        description: 'El identificador único del curso',
      },
      name: {
        bsonType: 'string',
        description:
          '\'name\' must be a string between 5 to 60 characters and is required',
        minLength: 5,
        maxLength: 60,
      },
      duration: {
        bsonType: 'string',
        description: '\'duration\' must be a string and is required',
      },
    },
    indexes: [
      {
        key: { _id: 1 },
        name: 'ui_course_id',
        unique: true,
        background: true,
        sparse: false,
        description: 'Unique index for \'_id\'',
      },
      {
        key: { name: 1 },
        name: 'ui_course_name',
        unique: true,
        background: true,
        sparse: false,
        description: 'Unique index for \'name\'',
      },
    ],
  }
}
```

```js
{
  $jsonSchema: {
    bsonType: 'object',
    required: ['_id', 'name', 'duration'],
    properties: {
      _id: {
        bsonType: 'objectId',
        description: 'El identificador único del curso',
      },
      name: {
        bsonType: 'string',
        minLength: 5,
        maxLength: 60,
        description: 'El nombre del curso (entre 5 y 60 caracteres)',
      },
      duration: {
        bsonType: 'string',
        description: 'La duración del curso en formato de cadena de caracteres',
      },
    },
    additionalProperties: false,
    indexes: [
      {
        key: { _id: 1 },
        name: 'ui_categories_id',
        unique: true,
        background: true,
        sparse: false,
        description: 'Índice único para el campo \'_id\'',
      },
      {
        key: { name: 1, duration: 1 },
        name: 'ui_categories_name_duration',
        unique: true,
        background: true,
        sparse: false,
        description:
          'Índice único para los campos \'name\' y \'duration\' (índice compuesto)',
      },
    ],
  },
}
```
