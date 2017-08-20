import MockExpressRequest from 'mock-express-request';
import MockExpressResponse from 'mock-express-response';

import { PassportAuthentication } from '../src';
import { localStrategyConfig, onLocalStrategy } from './lib/passport-authentication.config';


const userCredentials = {
  email: 'myemail@test.com',
  password: 'notSoRandom',
};

// TODO: Proper response...
const loginResponse = {};

const invalidUserCredentials = {
  email: 'myemail@test.com',
  password: 'random',
};

// Passport authentication instance
let passportAuthentication = null;

describe('Passport Authentication - Local Strategy', () => {
  it('Set Passport local strategy configuration', () => {
    passportAuthentication = new PassportAuthentication();
    passportAuthentication.setLocalStrategy(localStrategyConfig, onLocalStrategy);
  });


  it('Valid login via Passport local strategy', async() => {
    const req = new MockExpressRequest({ body: userCredentials });
    const res = new MockExpressResponse();

    // Expect 1 assertion that needs to resolve
    expect.assertions(1);
    await expect(passportAuthentication.authenticate(req, res, 'local')).resolves.toEqual(loginResponse);
  });


  it('Invalid login via Passport local strategy', async() => {
    const req = new MockExpressRequest({ body: invalidUserCredentials });
    const res = new MockExpressResponse();

    expect.assertions(1);
    await expect(passportAuthentication.authenticate(req, res, 'local')).rejects.toEqual({
      error: 'Local strategy: not authorised',
    });

  });
});


describe('Passport Authentication - JWT Strategy', () => {
  it('Set Passport JWT strategy configuration', () => {

  });

  it('Api call via Passport JWT strategy', () => {

  });
});
