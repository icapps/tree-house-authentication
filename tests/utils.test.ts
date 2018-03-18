import { getHashedPassword, comparePassword, generateRandomHash } from '../src';

const user = {
  password: 'myPassword',
};

describe('#Utils - cipher', () => {
  it('Should return true when password is valid', async () => {
    const hashedPassword = await getHashedPassword(user.password, 10);
    expect(await comparePassword(user.password, hashedPassword)).toBe(true);
  });

  it('Should return a random hashed string', async () => {
    const hashedString = generateRandomHash();
    expect(hashedString).toHaveLength(64);
  });
});
