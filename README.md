# Node Template

[![Build Status](https://travis-ci.com/BookBnB/node-template.svg?token=ztzmYxxiK9M4zZcGZZzZ&branch=master)](https://travis-ci.com/BookBnB/node-template)
[![codecov](https://codecov.io/gh/BookBnB/node-template/branch/master/graph/badge.svg?token=4TF231UDNN)](https://codecov.io/gh/BookBnB/node-template)

Template repo for nodejs services

## Run

Run:

```
npm run start
```

## Tests

```
npm run test			# all tests, no coverage
npm run test:unit		# unit tests only
npm run test:acceptance # accepatance test only
npm run test:coverage	# all tests, with coverage
```

## Migrations

Create migration file:

```
npm run migration:create <name>
```

E.g:

```
npm run migration:create CreateUsersTable
```

Run migrations:

```
npm run migration:run
npm run migration:revert
```

## Api docs

Se expone la especificación OpenApi en [localhost:3000/v1/api.json](http://localhost:3000/v1/api.json) y la ui swagger en [localhost:3000/v1/api-docs](http://localhost:3000/v1/api-docs/).

## Docker

Iniciar la app en desarrollo:

```
docker-compose up -d
```

Crear imagen con tag 'node-template':

```
docker/build_production_image.sh
```

Luego se puede iniciar la app en produccion:

```
docker/prod.sh up -d
```
