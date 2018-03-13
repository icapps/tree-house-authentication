# Tree-house Authentication

Authentication module written in TypeScript providing authentication utilities and JWT methods.

## Installation

Install via npm

```
npm install tree-house-authentication
```

or via yarn

```
yarn add tree-house-authentication
```

## Usage

- `const authenticator = require('tree-house-authentication')`
- `import * as authenticator from 'tree-house-authentication'`

## Configuration
```
const jwtSettings = {
  algorithm: 'HS256',
  expiresIn: '7d',
  audience: 'TREEHOUSE-AUTH',
  issuer: 'treehouse-authentication',
  secretOrKey: '5kZxE|gZu1ODB183s772)/3:l_#5hU3Gn5O|2ux3&lhN@LQ6g+"i$zqB_C<6',
};
```
> You can find all possible configuration options at [Github: node-jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)

## JWT
### createJwt(payload, jwtSettings)
Returns a json webtoken with the provided payload and configuration. (**Asynchronous**)

### authenticateJwt(token, jwtSettings)
Returns decoded jwt token when the provided token is still valid. (**Asynchronous**)

### decodeJwt(token)
Return a decoded json webtoken. This does not validate the token. (**Synchronous**)

## Utilities
### generateRandomHash(algorithm (optional), secret (optional))
Return a random hash (can be used for tokens) (**Synchronous**)

### getHashedPassword(password, saltCount)
Returns a hashed password. (**Asynchronous**)

### comparePassword(password, hashedPw)
Check whether a password is valid compared with a hashed password. (**Asynchronous**)

## Tests

  You can run `yarn test` to run all tests
  You can run `yarn test:coverage` to run all tests with coverage report
  
## Authors

See the list of [contributors](https://github.com/icapps/tree-house-authentication/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
