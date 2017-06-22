Treehouse Authentication
=========

Tree-house Authentication module

## Installation

  `npm install tree-house-authentication`

##### Passport - configuration
```
const localStrategyConfig = {
    usernameField: 'email',
    passwordField: 'password',
};

const jwtStrategyConfig = {
    secret: '8^dxE|gZu1ODB183s772)/3:l_#fdsfsdf|2ux3&lhN@LQ6g+"i$zq45fsdq1',
    algorithm: 'HS256',
    expiresIn: 24 * 60 * 60,
    issuer: 'treehouse',
    audience: 'TREEHOUSE',
    authScheme: 'X-Session-Id',
};

// Implement own logic for local authorisation - must return a Promise
function onLocalStrategy(email, password) { 
     // Own authentication logic...
     return Promise.resolve(jwtToken);
}

// Implement own logic for authorisation via JWT - must return a Promise
function onJwtStrategy(payload) {
    // Own authentication logic...
    return Promise.resolve(userData);
}
```
> The next function expects an error as first parameter and the response as second parameter

##### Passport - usage

```
import { PassportAuthentication } from 'tree-house-authentication';
const passportAuthentication = new PassportAuthentication();

passportAuthentication.setLocalStrategy(localStrategyConfig, onLocalStrategy);
passportAuthentication.setJwtStrategy(jwtStrategyConfig, onJwtStrategy);
```
> The authenticate() function will always return a Promise.

**Local strategy authentication**

`passportAuthentication.authenticate('local').then(...)`


**JWT Strategy authentication**

`passportAuthentication.authenticate('jwt').then(...)`

## Tests

  You can run `npm test` to run all tests 
