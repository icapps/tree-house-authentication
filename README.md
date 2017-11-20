Treehouse Authentication
=========

Tree-house Authentication module written in TypeScript.

## Installation

  `npm install tree-house-authentication`
  
## Base classes
Following interfaces are available:

```
- TreeAuthentication
	- authenticate: (jwtToken: string | Object) => Promise < {} > ;
```

## Jwt - configuration
```
const configuration = {
  algorithm: 'HS256',
  expiresIn: '7d',
  audience: 'TREEHOUSE-AUTH',
  issuer: 'treehouse-authentication',
  secretOrKey: '5kZxE|gZu1ODB183s772)/3:l_#5hU3Gn5O|2ux3&lhN@LQ6g+"i$zqB_C<6',
};
```
> You can find all possible configuration options at [Github: node-jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)

## Jwt - usage

```
import { JwtAuthentication } from 'tree-house-authentication';

// Pass configuration via constructor
const authenticator = new JwtAuthentication(configuration);
```

### authenticator.createToken(payload)
**Asynchronous**: returns a json webtoken with your payload and previously set configuration.

### authenticator.authenticate(jwtToken)
**Asynchronous**: returns decoded jwt token when the provided token is still valid.

## Extra utilities
We provide an extra set of utility functions (these are all static functions):

`import { CipherUtils } from 'tree-house-authentication`

### getHashedPassword(password, saltCount)
**Asynchronous**: returns a hashed password.

### comparePassword(password, hashedPw)
**Asynchronous**: Check whether a password is valid compared with a hashed password.

### decodeJwt(jwtToken)
**Synchronous**: Return a decoded json webtoken. This does not validate the token.

### generateRandomHash(algorithm (optional), secret (optional))
**Synchronous**: Return a random hash (can be used for tokens) 

## Tests

  You can run `yarn test` to run all tests
  You can run `yarn test:coverage` to run all tests wuth coverage report
