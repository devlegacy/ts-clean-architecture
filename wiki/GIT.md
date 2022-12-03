<h1 align="center">GIT</h1>

<h2 align="center">Commits</h2>

<h3 align="center">Message</h3>

```vim
[action]([module]): add some new feature
- body...
- body...
- [closes|issue|related to] [#32 | reference]
```

📏 Rules:
- It should answer the question What? and Why?
- It should use imperative actions

🔗 Read more on:
- [🦊 issues](https://docs.gitlab.com/ee/user/project/issues/managing_issues.html#default-closing-pattern)
- [🐙 issues](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword)

<h3 align="center">Commit convention</h3>

```sh
  # 🛠️ tools: commitizen + @commitlint/config-conventional
  git cz
```

```sh
  # 💡 samples:
  chore(deps): bump dependencies
  chore(deps-dev): bump dependencies
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
  - main | master
  - develop
----
- flow branches
  - feature: new functionality
    - develop ➡ feature/[name] ➡ develop
  - bug: 
  - support:
  - release: new version and stable
    - develop ➡ release/[major.minor.patch] ➡ master, develop
  - hotfix: [change | patch] important
    - master  ➡ hotfix/[name] ➡ master, develop
  - fix: fix error

<h2 align="center">Issues</h2>

💡 Samples:
- closes #32
- related to #32

🔗 Read more on:
- [🦊 issues](https://docs.gitlab.com/ee/user/project/issues/managing_issues.html#default-closing-pattern)
- [🐙 issues](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword)

<h2 align="center">Merge request | Pull request</h2>

📏 Rules:
- It should explain what the change want to achieve
- It should descriptive commit messages
- It should have a ticket/issue link
- It should have screenshots
- It should have a delta less than 200 lines

## Code review

- add comments to code

- Acceptance criteria
- Side effects
- Legibility
- Maintainability
- Consistence
- Performance
- Exception handler
- Simplicity
- Testing
---
- Automate - eslint
- Each member of the team should do code reviews!
- ask for context
- Focus on code not on developer
- ask for (opinions|alternatives), not to give orders
- answer comments

## TIPS

```sh
  git gc
```

## Read more

- https://shields.io/category/platform-support
- https://git-lfs.github.com/
