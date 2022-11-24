## About

Backend part for test react-node-mongo app


## Available Scripts

### `npm test`

Run all unit-tests with hot-reloading.

### `npm run lint`

Check for linting errors.

### `npm run build`

Build the project for production.

### `npm start`

Run the production build (Must be built first).

### `npm run prettier-check`

Check for prettier errors.

### `npm run prettier`

Fixes prettier errors, make code to align prettier rules.

## Initial configuration

1. `npm install`
2. set following variables to .env file

NODE_ENV=development
PORT=8080
SECRET=<your secret>
DB_URL=<your DB URL>
ORIGINS_WHITELIST=http://localhost:8080/,https://localhost:8443/

3. `npm run start`

## Self Signed Certificate (SSC) creation for debugging

1. create private.key
`openssl genrsa 1024 > private.key`

2. create cert
`openssl req -new -key private.key -out cert.csr`

3. sign certificate
`openssl x509 -req -in cert.csr -signkey private.key -out certificate.pem`

4. put `private.key` and `certificate.pem` files into bin/ directory
