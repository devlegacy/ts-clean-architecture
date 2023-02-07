# Node.js

## Memory footprint

## Cluster mode

- [ ] Create config

## Node Memory

```sh
  node --max-old-space-size=1024
```

## Crypto

```sh
  crypto.randomBytes(16).toString('base64')
  crypto.randomBytes(16).toString('hex')
```

## Management

```sh 
  npm cache verify
  npm cache clean
  npm cache clean --force

  npm cache verify && npm cache clean --force
```
