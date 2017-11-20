import { getHashedPassword, comparePassword, createJwt, verifyJwt, decodeJwt, generateRandomHash } from '../src/utils/cipher';

const user = {
  password: 'myPassword',
};

const jwtConfiguration = {
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

let token;

describe('#Utils - cipher', () => {
  test('Should return true when password is valid', async() => {
    const hashedPassword = await getHashedPassword(user.password, 10);
    expect(await comparePassword(user.password, hashedPassword)).toBe(true);
  });

  test('Should return a random hashed string', async() => {
    const hashedString = generateRandomHash();
    expect(hashedString).toHaveLength(64);
  });

  test('Should return a valid JWT token', async() => {
    const jwtToken = await createJwt(user, jwtConfiguration.secretOrKey, jwtConfiguration);
    expect(typeof jwtToken).toBe('string');
    token = jwtToken;
  });

  test('Should throw an error when trying to create an invalid JWT token', async() => {
    await expect(createJwt(user, jwtConfiguration.secretOrKey, invalidJwtConfiguration)).rejects;
  });

  test('Should verify a valid JWT token', async() => {
    const payload = await verifyJwt(token, jwtConfiguration.secretOrKey, jwtConfiguration);
    expect(payload).not.toBeNull;
    expect(payload).toHaveProperty('iat');
    expect(payload).toHaveProperty('exp');
    expect(payload).toHaveProperty('aud');
    expect(payload).toHaveProperty('iss');
  });

  test('Should throw an error when trying to validate an invalid JWT token', async() => {
    await expect(verifyJwt('myInvalidToken', jwtConfiguration.secretOrKey, invalidJwtConfiguration)).rejects;
  });

  test('Should decode a valid JWT token', async() => {
    const payload = await decodeJwt(token);
    expect(payload).not.toBeNull;
    expect(payload).toHaveProperty('iat');
    expect(payload).toHaveProperty('exp');
    expect(payload).toHaveProperty('aud');
    expect(payload).toHaveProperty('iss');
  });
});
