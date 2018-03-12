import { DEFAULT_JWT_CONFIG } from '../src/config/jwtConfig';
import { createJwt, verifyJwt, decodeJwt, authenticateJwt } from '../src/lib/jwtAuthentication';

const validJwtConfiguration = {
  algorithm: 'HS256',
  expiresIn: '7d',
  audience: 'TREEHOUSE-AUTH',
  issuer: 'treehouse-authentication',
  secretOrKey: '5kZxE|gZu1ODB183s772)/3:l_#5hU3Gn5O|2ux3&lhN@LQ6g+"i$zqB_C<6',
};

const invalidJwtConfiguration = {
  algorithm: 'HS256',
  expiresIn: '7d',
  audience: 'TREEHOUSE-AUTH',
  issuer: 'treehouse-authentication',
  myInvalidKey: 'invalidKey',
};

const user = {
  firstName: 'Brent',
  lastName: 'Van Geertruy',
};

let token = null;

describe('#Jwt authentication', () => {
  beforeAll(async () => {
    token = await createJwt(user, validJwtConfiguration.secretOrKey, validJwtConfiguration);
  });

  it('Should return a valid JWT token', async () => {
    const jwtToken = await createJwt(user, validJwtConfiguration.secretOrKey, validJwtConfiguration);
    expect(typeof jwtToken).toBe('string');
  });

  it('Should throw an error when trying to create an invalid JWT token', async () => {
    await expect(() => createJwt(user, validJwtConfiguration.secretOrKey, invalidJwtConfiguration)).rejects;
  });

  it('Should verify a valid JWT token', async () => {
    const payload = await verifyJwt(token, validJwtConfiguration.secretOrKey, validJwtConfiguration);
    expect(payload).not.toBeNull;
    expect(payload).toHaveProperty('iat');
    expect(payload).toHaveProperty('exp');
    expect(payload).toHaveProperty('aud');
    expect(payload).toHaveProperty('iss');
  });

  it('Should throw an error when trying to validate an invalid JWT token', async () => {
    await expect(() => verifyJwt('myInvalidToken', validJwtConfiguration.secretOrKey, invalidJwtConfiguration)).rejects;
  });

  it('Should decode a valid JWT token', async () => {
    const payload = await decodeJwt(token);
    expect(payload).not.toBeNull;
    expect(payload).toHaveProperty('iat');
    expect(payload).toHaveProperty('exp');
    expect(payload).toHaveProperty('aud');
    expect(payload).toHaveProperty('iss');
  });

  it('Should verify a valid JWT token', async () => {
    const payload = await authenticateJwt(token, validJwtConfiguration);
    expect(payload).not.toBeNull;
    expect(payload).toHaveProperty('iat');
    expect(payload).toHaveProperty('exp');
    expect(payload).toHaveProperty('aud');
    expect(payload).toHaveProperty('iss');
  });

  it('Should throw an error when trying to validate with an empty JWT token', async () => {
    await expect(() => authenticateJwt('', validJwtConfiguration)).rejects;
  });

  it('Should throw an error when trying to validate an invalid JWT token', async () => {
    await expect(() => authenticateJwt('myInvalidToken', validJwtConfiguration)).rejects;
  });
});
