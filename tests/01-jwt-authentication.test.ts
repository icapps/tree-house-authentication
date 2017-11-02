import MockExpressRequest from 'mock-express-request';
import MockExpressResponse from 'mock-express-response';

// Correct user credentials
const userCredentials = {
  email: 'myemail@test.com',
  password: 'notSoRandom',
};

// Incorrect user credentials
const invalidUserCredentials = {
  email: 'myemail@test.com',
  password: 'random',
};

let jwtToken = null;

/* describe('Jwt Authentication', () => {
  it('Set Passport strategies configuration', () => {
    passportAuthentication.setLocalStrategy(localStrategyConfig, onLocalStrategy);
    passportAuthentication.setJwtStrategy(jwtStrategyConfig, onJwtStrategy);
  });

  it('Valid login via Passport local strategy', async() => {
    const req = new MockExpressRequest({ body: userCredentials });
    const res = new MockExpressResponse();

    // Expect 1 assertion that needs to resolve
    expect.assertions(1);

    // Check if object returned contains a token property
    jwtToken = await passportAuthentication.authenticate(req, res, 'local');
    expect(jwtToken).toHaveProperty('token');
  });

  it('Invalid login via Passport local strategy', async() => {
    const req = new MockExpressRequest({ body: invalidUserCredentials });
    const res = new MockExpressResponse();

    expect.assertions(1);
    await expect(passportAuthentication.authenticate(req, res, 'local')).rejects.toEqual({
      error: 'Local strategy: not authorised',
    });
  });

  it('Valid authentication via jwt strategy', () => {
  });
});
 */
