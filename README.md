# node-backend

## List of endpoints

- `/health`: health endpoint used to check health status
- `/new-url/docs`: documentation for all endpoints

## Prerequisite

### node 20

We use node 20, please use prefered node version manager to ensure you have the expected version.

### pnpm

This project use pnpm (https://pnpm.io/).

Recommended way to follow package management requirements is to intall
Corepack (https://www.npmjs.com/package/corepack)

```
npm install -g corepack && corepack enable
```

## Installing dependencies

```
pnpm install
```

## Build production app

```
pnpm build
```

## Run the service locally in development mode

```
pnpm dev
```

## Test

you can run:

```
pnpm test
```

Test are done using Jest you can run `pnpm test:dev` if you want the tests to rerun on update.

## Lint

```
pnpm lint
```

It is a combine of typescript type validation: `pnpm lint:tsc`, validation of the code style: `pnpm lint:eslint` and check for outdated package: `pnpm dep:check`

## Update outdated package

```
pnpm dep:update
```

You will be prompted about which dependencies you want to update to the last version.
