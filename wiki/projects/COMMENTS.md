# Comments

- [Octicons](https://primer.style/design/foundations/icons)
- [Codicon](https://microsoft.github.io/vscode-codicons/dist/codicon.html)

- TODO:
  - issue-opened
  - bookmark
  - todo
- BUG:
  - bug
- HACK:
  - tool
- FIXME:
  - flame
  - alert
  - warning
- NOTE:
  - note
- DOC: ❌
  - book
- DEBT:
  - alert-fill
  - issue-reopened
- TRANSLATE:
  - globe
  - pencil

```ts
/**
 * * Important information
 * ! Deprecated method, do not use
 * ? Should this method be exposed in the public API?
 * TODO: Refactor thus method so it conforms to the API
 * BUG: This method does not work correctly
 * HACK: This method is a hack
 * FIXME: This method is not working
 * NOTE: This method is not working
 * DOC: This method is not working
 * DEBT: This method is not working
 * TRANSLATE: This method is not working
 * @deprecated warning
 * @param {string} value - The first value parameter
 * @returns {string} the complete value
 */ 
function sample(value: string): string {
  return `sample ${value}`;
}
// TODO: Refactor thus method so it conforms to the API
// BUG: This method does not work correctly
// HACK: This method is a hack
// FIXME: This method is not working
// NOTE: This method is not working
// DOC: This method is not working
// DEBT: This method is not working
// TRANSLATE: This method is not working
```
