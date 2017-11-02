import JwtAuthentication from '../src/lib/jwt.authentication';
import { DEFAULT_JWT_CONFIG } from '../src/config/jwt.config';

const jwtConfiguration = {
  algorithm: 'HS256',
  expiresIn: '7d',
  audience: 'TREEHOUSE-AUTH',
  issuer: 'treehouse-authentication',
  secretOrKey: '5kZxE|gZu1ODB183s772)/3:l_#5hU3Gn5O|2ux3&lhN@LQ6g+"i$zqB_C<6',
};

const user = {
  firstName: 'Brent',
  lastName: 'Van Geertruy',
};

let authenticator = null;
let token = null;

describe('#Jwt authentication', () => {
  test('Should create a new Jwt authenticator instance with default configuration', () => {
    const defaultAuthenticator = new JwtAuthentication();
    expect(defaultAuthenticator.configuration).toEqual(DEFAULT_JWT_CONFIG);
  });

  test('Should create a new Jwt authenticator instance with custom configuration', () => {
    authenticator = new JwtAuthentication(jwtConfiguration);
    expect(authenticator.configuration).toEqual(jwtConfiguration);
  });


  test('Should return a valid JWT token', async() => {
    const jwtToken = await authenticator.createToken(user);
    expect(typeof jwtToken).toBe('string');
    token = jwtToken;
  });

  test('Should verify a valid JWT token', async() => {
    const payload = await authenticator.authenticate(token);
    expect(payload).not.toBeNull;
    expect(payload).toHaveProperty('iat');
    expect(payload).toHaveProperty('exp');
    expect(payload).toHaveProperty('aud');
    expect(payload).toHaveProperty('iss');
  });

  test('Should throw an error when trying to validate without JWT token', async() => {
    await expect(authenticator.authenticate()).rejects;
  });

  test('Should throw an error when trying to validate an invalid JWT token', async() => {
    await expect(authenticator.authenticate('myInvalidToken')).rejects;
  });
});
