# API (Application Programming Interface)

- Rest: Representational State Transfer, it's an implementation of an architectural style that allows manipulation of resources through a set of predefined operations (HTTP methods, like GET, POST, PUT, DELETE)
- Restful: API that follows the principles of REST

## Timing

~ 2 seg

## Documentation

- https://jsonapi.org/

## Notes

- Creación de un mismo recurso con el ID en request
  - [Problema de los dos generales](https://en.wikipedia.org/wiki/Two_Generals%27_Problem)
- idempotent: a single request modification

## Concepts

- Resources: Data that can be accessed by a client. Images, Videos, Text, Numbers, etc.
- Endpoints: Access points to resources. URLs that clients can use to access resources.
- URI: Uniform Resource Identifier. A string of characters that identifies a resource. `/books/{bookId}`
- URL: Uniform Resource Locator. A URI that specifies where a resource is located. `https://api.example.com/books/{bookId}` | `ftp://api.example.com/books/{bookId}.json`

## Principles

- Uniform Interface
- HTTP Methods
- Stateless
- Endpoints building (resource hierarchy)
  - Coherence
  - Consistency
  - Predictability
  - Discoverability
  - Flexibility

- camelCase:
  - Parameters
- kebab-case:
  - endpoints

- query parameters
  - paginate
    - `?page=1&limit=10`
  - filter
    - `?last-name=smith&level=3`
  - sort
    - `?sort=+name,+last-name,-age`
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
- `HEAD`:
  - Resource exists
  - Resource size
  - Versioning
  - Resource chunking
- `DELETE`
  - `DELETE` -> `CRUD`
  - `204` - No content

---
Errors
- 400: Bad Request
- 404: Not Found
- 422: Unprocessable Entity
