import { Algorithm } from 'jsonwebtoken';
import { createJwt, authenticateJwt, decodeJwt } from '../src';

const validJwtConfiguration = {
  algorithm: 'HS256' as Algorithm,
  expiresIn: '7d',
  audience: 'TREEHOUSE-AUTH',
  issuer: 'treehouse-authentication',
  secretOrKey: '5kZxE|gZu1ODB183s772)/3:l_#5hU3Gn5O|2ux3&lhN@LQ6g+"i$zqB_C<6',
};

const invalidJwtConfiguration = {
  algorithm: 'HS256' as Algorithm,
  expiresIn: '1q',
  audience: 'TREEHOUSE-AUTH',
  issuer: 'treehouse-authentication',
  secretOrKey: 'invalidKey',
};

const user = {
  firstName: 'Brent',
  lastName: 'Van Geertruy',
};

let token: any = null;

describe('#Jwt authentication', () => {
  beforeAll(async () => {
    token = await createJwt(user, validJwtConfiguration);
  });

  it('Should create a valid JWT token', async () => {
    const jwtToken = await createJwt(user, validJwtConfiguration);
    expect(typeof jwtToken).toBe('string');
  });

  it('Should create a valid JWT token with default configuration', async () => {
    const jwtToken = await createJwt(user);
    expect(typeof jwtToken).toBe('string');
  });

  it('Should throw an error when trying to create an invalid JWT token', async () => {
    expect.assertions(1);
    try {
      await createJwt(user, invalidJwtConfiguration);
    } catch (e) {
      expect(e).toContain('Something went wrong trying to create a json webtoken');
    }
  });

  it('Should authenticate a valid JWT token', async () => {
    const payload = await authenticateJwt(token, validJwtConfiguration);
    expect(payload).not.toBeNull;
    expect(payload).toHaveProperty('iat');
    expect(payload).toHaveProperty('exp');
    expect(payload).toHaveProperty('aud');
    expect(payload).toHaveProperty('iss');
  });

  it('Should authenticate a valid JWT token with default configuration', async () => {
    const payload = await authenticateJwt(token);
    expect(payload).not.toBeNull;
    expect(payload).toHaveProperty('iat');
    expect(payload).toHaveProperty('exp');
    expect(payload).toHaveProperty('aud');
    expect(payload).toHaveProperty('iss');
  });

  it('Should throw an error when trying to authenticate an invalid JWT token', async () => {
    expect.assertions(1);
    try {
      await authenticateJwt('invalidToken');
    } catch (e) {
      expect(e).toContain('Something went wrong trying to verify the json webtoken');
    }
  });

  it('Should throw an error when trying to validate an invalid JWT token', async () => {
    await expect(() => authenticateJwt('myInvalidToken', invalidJwtConfiguration)).rejects;
  });

  it('Should throw an error when trying to validate with an empty JWT token', async () => {
    expect.assertions(1);
    try {
      await authenticateJwt('', validJwtConfiguration);
    } catch (e) {
      expect(e).toEqual(new Error('JWT token is empty.'));
    }
  });

  it('Should decode a valid JWT token', async () => {
    const payload = await decodeJwt(token);
    expect(payload).not.toBeNull;
    expect(payload).toHaveProperty('iat');
    expect(payload).toHaveProperty('exp');
    expect(payload).toHaveProperty('aud');
    expect(payload).toHaveProperty('iss');
  });
});
