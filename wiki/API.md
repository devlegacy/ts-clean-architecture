# API

## Timing

~ 2 seg

## 

- https://jsonapi.org/

## 

- Creación de un mismo recurso con el ID en request
  - [Problema de los generales](https://en.wikipedia.org/wiki/Two_Generals%27_Problem)
- idempotent: a single request modification

## Methods

- `GET`
  - `READ` -> `CRUD`
  - `200`
- `POST`
  - `CREATE` -> `CRUD`
  - Add an ID to a resource
  - Neither safe nor idempotent
  - Multiple requests may create multiple resources
  - `201`
- `PUT`
  - `UPDATE` -> `CRUD`
  - Create or update a (complete) resource (by ID)
  - Not safe (modifies or creates states within resource)
  - Idempotent (same result if called multiple times)
    - Multiple requests may create | update a single resource
  - `200` - On update
  - `201` - On create
  - `204` - No updates
- `PATCH`
  - `UPDATE` -> `CRUD`
  - Partially update a resource (by ID)
  - Neither safe nor idempotent
  - `200` - On update
  - `204` - No updates
