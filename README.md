# MERN Monorepro TypeScript template

A MERN template that uses [Yarn](https://yarnpkg.com/) monorepo and [TypeScript](https://www.typescriptlang.org/)

- [installation](#installation)
- [configuration](#configuration)
  - [server](#server-config)
    - [env](#server-env)
    - [email config](#email-config)
  - [web](#web-config)
    - [env](#web-env)
- [develop](#develop)
- [build](#build)
- [serve](#serve)

## installation

run `yarn` in the project root folder.

if Yarn is not installed run: `npm install -g yarn`

## configuration

### server config

#### server env

in the folder `./packages/server/` create the following files: `.env.development, .env.production, .env.test`

and copy the content of `.env.example` into them.

and change the variables:

**PORT** - the port that the server will use (for example : 5000)

**SITE_URL** - the url used for emails such as password recovery, password reset, etc.. (expected '/' at the end)

**MONGO_URI** - [MongoDB connection string](https://docs.mongodb.com/manual/reference/connection-string/)

**JWT_SECRET** - the secret which will ne used for JWT

**JWT_EXPIRE** - the duration for the jwt ([usage example](https://github.com/auth0/node-jsonwebtoken/blob/master/README.md#usage) check expiresIn field)

**EMAIL_API_KEY** - api key for email sending (the default is [sendgrid](https://sendgrid.com/) to change that go to [email config](#email-config))

**SITE_MAIL** - the email address which will be shown as the sender

#### email config

open the file `./packages/server/src/config/mail/ts` and change the connection info (using [nodemailer](https://nodemailer.com/about/))

### web config

#### web env

in the folder `./packages/web/` create the following file: `.env`

and copy the content of `.env.example` into them.

and change:

**REACT_APP_CAPTCHA_KEY** - google's v2 recaptcha key ([create one here](https://www.google.com/recaptcha/admin)) used for forms built with [ez-formikui](https://github.com/DavidEdri/ez-formikui) (ignore this step if you are not planning to use captcha)

## develop

in the root folder run `yarn dev`

## build

**using [docker](https://www.docker.com/)**:

run the following in the root folder:

1. `yarn build`
2. `docker build -t <tagname>:<version> .`

using sh:

run `./scripts/build/all.sh`

the output will be at `./deployment`

## serve

after the [build](#build) process run the following:

using docker - `docker run -d -p <port>:5000 <tagname>:<version>`

other: `cd <path to deployment folder> && npm run serve`
