<h1 align="center">quarantine wishes</h1>

![Heroku](https://heroku-badge.herokuapp.com/?app=heroku-badge)

this is a really simple web app i made to learn how to deploy to heroku and the ability to serve a react app from a server which also works as an api.

it features an api using **koa**, connected to a **postgresql** database using **knexjs** in order to write pretty cool queries without any sql. the same api serves a dead-simple **react** app using the [raster](https://github.com/rsms/raster) css grid system.

## setup

### prerequisites

- install postgres

and...

`npm install`

### migrations

knex provides a great migration system. to run the migrations:

`knex migrate:latest`

all npm scripts run that command first. for more information, refer to knexjs [docs](https://knexjs.org/#Migrations).

### development

to start the api development:

`npm start dev`

then from `src/client`

`npm start`

this will start react's development configuration. by default it will listen to port 3000, so either you change the api port (which by default is 3000 too) or just start reacts after the api and say yes to the prompt which will ask if it should run in another port.

### build

in order to run a production-ready react build just go to `src/client` and run

`npm run build`

then, start the server with

`npm start`

which will handle migrations automatically.

## environment variables

- `PORT`: the port which the koa server will use.
- `RATE_LIMIT`: max number of requests that the server will receive from a certain ip.
- `RATE_LIMIT_DURATION`: duration of the rate limit period.
- `POSTGRES_HOST`: postgres db host.
- `POSTGRES_USER`: postgres db user.
- `POSTGRES_PASSWORD`: postgres db password.
- `POSTGRES_DB`: postgres db.
- `MAX_WISHES_PER_DAY`: max number of wishes a certain ip can send each day.
