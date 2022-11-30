# GIT

## Commit

### Message

chore(module): add some new feature 

- body
- body
- Closes #32

- It should answer the question What? and Why?
- It should use imperative actions

### Commit convention

```sh
  git cz
```

```md
  chore(deps): bump dependencies
  chore(deps-dev): bump dependencies
```

#### First commit message sample

```md
  chore(project): start project   
    - create scaffolding
    - add config files
    - setting project/ide/editor files   
```

#### Bump dependencies

```md
  chore(packages): bump dependencies   
    - update dependencies
    - update dev dependencies
```

#### No verify | Skip hooks

```sh
  git commit -m "" --no-verify
```

#### Empty commit

```sh
  git commit --allow-empty -m "build(empty): trigger build"
```

## Branch

Rules: 

- It should permit identify changes
- It should be consistent along the project
- It should permit identify the associated task

- feature: new functionality
- release: new version and stable
- hotfix: change important
- fix: fix error

- `[keyword]/[description]` | `feature/course`
- `feature[-task]/[description]` | `feature-32/course`
- `feature/[task]-[description]` | `feature/32-course`
