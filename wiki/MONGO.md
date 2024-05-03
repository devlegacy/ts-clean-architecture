# MongoDB

## Atlas

- [Consulting]()
- [Perform advisor](https://cloud.mongodb.com/v2/61ba10a74465e17aa31e97cf#metrics/replicaSet/61ba12eaa5284b193982b5de/advisor)
- [Metrics: +Document metrics](https://cloud.mongodb.com/v2/61ba10a74465e17aa31e97cf#host/replicaSet/61ba12eaa5284b193982b5de)

## Profiler

---
- [Profiler -> examined:return ratio](https://cloud.mongodb.com/v2/61ba10a74465e17aa31e97cf#metrics/replicaSet/61ba12eaa5284b193982b5de/profiler)
---
- **Orange** ![#f68a1e](https://via.placeholder.com/15/f68a1e/000000?text=+): Indicates queries that are taking longer than expected, suggesting optimization is needed.
- **Blue** ![#0498EC](https://via.placeholder.com/15/0498EC/000000?text=+): Usually represents read operations, with variations indicating different execution time ranges.
- **Salmon** ![#f38183](https://via.placeholder.com/15/f38183/000000?text=+): May indicate write or update operations, helping to distinguish different types of database operations.
- **Green** ![#00ED64](https://via.placeholder.com/15/00ED64/000000?text=+): Often associated with queries that execute quickly and are considered efficient.
- **Yellow** ![#fbb129](https://via.placeholder.com/15/fbb129/000000?text=+): Used to highlight operations that require attention but are not as critical as those marked in orange.
- **Gray** ![#889397](https://via.placeholder.com/15/889397/000000?text=+): Commands or operations that are neutral, do not fit into specific performance categories, or have failed due to specific errors, such as index creation failures or duplicate key errors.
- **Red** ![#FF0000](https://via.placeholder.com/15/FF0000/000000?text=+): Often indicates critical issues or errors that require immediate attention.
- **Purple** ![#800080](https://via.placeholder.com/15/800080/000000?text=+): Can indicate specific types of operations or metrics, depending on the context.


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
