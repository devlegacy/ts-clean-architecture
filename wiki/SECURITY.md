# Security

- CORS
- CSRF
- Rate limiting

- [OWASP](https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html)
- [JWT](https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/#jwt_persist)

```sh
  echo "${salt} ${password}" | sha256sum
```
```js
  const salt = crypto.randomBytes(16).toString('hex');
  const saltedPassword = `${salt}${password}`;
  // const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  const cryptPassword = crypto.createHas('sha256').update(saltedPassword).digest().toString('hex');
```
