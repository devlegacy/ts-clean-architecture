<h1 align="center">GIT</h1>

<h2 align="center">First steps</h2>

### Set profile

```sh
  git config --global user.name "Samuel R." && \
  git config --global user.email "srojas@ggtech.es"
```

<h2 align="center">Commits</h2>

<h3 align="center">Message</h3>

```vim
[action]([module]): add some new feature
- body...
- body...
- [closes|issue|related to] [#32 | reference]
```

📏 Rules:
- It should answer the question What? and Why? vs How?
- It should use imperative actions

🔗 Read more on:
- [🦊 issues](https://docs.gitlab.com/ee/user/project/issues/managing_issues.html#default-closing-pattern)
- [🐙 issues](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword)
- [📏 rules](https://cbea.ms/git-commit/#seven-rules)

<h3 align="center">Commit convention</h3>

```sh
  # 🛠️ tools: commitizen + @commitlint/config-conventional
  git cz
```

```sh
  # 💡 samples:
  chore(deps): bump dependencies
  chore(deps-dev): bump dependencies
  
  imp(scaffold): add lint rules
```

🎬 actions: 
- :sparkles: feat 
- :bug: fix 
- :memo: docs
- :art: style 
- :recycle: refactor 
- :zap: perf 
- :white_check_mark: test 
- :construction_worker: build
- :construction_worker: ci 
-  chore
- :rewind: revert
- :construction: wip
- :art: :zap: imp 

🔗 Read more on:
- [gitmoji](https://gitmoji.dev/)

#### First commit message sample

```md
  chore(project): start project   
    - create scaffolding
    - add config files
    - setting project/ide/editor files   
```

#### Bump dependencies

```md
chore(deps): bump dependencies   
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

<h2 align="center">Branches</h2>

💡 Samples:
- `[keyword]/[description]` | `feature/course`
- `feature[-task]/[description]` | `feature-32/course`
- `feature/[task]-[description]` | `feature/32-course`

📏 Rules: 
- It should permit identify changes
- It should be consistent along the project
- It should permit identify the associated task

Branch names: 
- 🔑 key or principal branches
  - `main` | `master`: 
  - `develop`: Donde se integrarán los desarrollos, parte originalmente de `main`/`master`
----
- 🔀 flow branches
  - `feature`: Para cada nueva feature|tarea|funcionalidad que añadamos al proyecto, partirán de `develop` y se crean los PRs para hacer merge en esa misma rama
    - `develop` ➡ `feature/[name]` ➡ `develop`
  - `bug`: 
  - `support`:
  - `release`: Parte desde `develop` para integrarse con el código de `main`/`master` de cara a generar nuevas y estables versiones de nuestra aplicación
    - `develop` ➡ `release/[major.minor.patch]` ➡ `master`, `develop`
    - en backend carece de sentido
  - `hotfix`: Al estar orientadas a resolver fallos en producción rápidamente, parte y se integra directamente en `main`/`master`, llevando también la corrección a `develop`
    - [change | patch] important
    - `master`  ➡ `hotfix/[name]` ➡ `master`, `develop`
  - `fix`: fix error

- `develop`:  Se correspondería con nuestras ramas `feature`/`fix`/`update`…
- `production`: Aquí podemos encontrar dos escenarios; que se corresponda con la rama `main`/`master`, o con el último punto de nuestra rama de trabajo
- `pre-production`: En este caso partiría del mismo punto que el entorno de desarrollo

⚙ Settings:

- Branch rules
- Requiere approving reviewer(s)
- Require CI/CD checks to pass 
- Require signed commits
- Delete branches on merge

<h2 align="center">Environments</h2>

- `production`
- `develop`
- `staging`
- `test`

<h2 align="center">Issues</h2>

Actionable | Task | Topics | Bugs

💡 Samples:
- closes #32
- related to #32

🏷 Labels:

- `documentation`

🔗 Read more on:
- [🦊 manage](https://docs.gitlab.com/ee/user/project/issues/managing_issues.html#default-closing-pattern)
- [🦊 templates](https://docs.gitlab.com/ee/user/project/description_templates.html)
- [🐙 manage](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword)
- [🐙 templates](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/configuring-issue-templates-for-your-repositoryd)

<h2 align="center">🤝 Merge request | Pull request</h2>

Pull (move towards) Request (PR): 
  - 🐙 github y bitbucket
  - Solicitud para mover/jalar cambios de una rama o repositorio hacia otro

Merge (join) Request (MR):
  - 🦊 gitlab
  - Solicitud para fusionar/unir cambios de una rama o repositorio hacia otro

Ambos términos se refieren al mismo concepto básico.

⚙ Settings:

- Branch requirements

🏷 Labels:

- `bug`

📏 Rules:
- It should have a title limit of 72 characters
- It should explain what the change wants to achieve
- It should have a descriptive commit messages
- It should have a ticket/issue link (task list)
- It should have screenshots/animation/uml (if we worked with something complex)
- It should have a delta less than 200 lines

- tree explorer gitlab | github

<h2 align="center">📄🔍 Code reviews</h2>

📏 Rules to reviewer:
- add comments to code

📏 Rules for review:
- Acceptance criteria
- Side effects
- Legibility
- Maintainability
- Consistence
- Performance
- Exception handler
- Simplicity
- Testing

✅ Good practice:
- 🤖 Automate - eslint
- each team member should do code reviews!
- ask for context
- Focus on code not on developer
- ask for (opinions|alternatives), not to give orders
- answer comments

## TIPS

```sh
  git gc
```

```sh
  git squash
```

## 🔗 Read more on

- https://shields.io/category/platform-support
- https://git-lfs.github.com/
- https://github.com/tj/git-extras
