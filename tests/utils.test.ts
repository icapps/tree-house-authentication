import { getHashedPassword, comparePassword, generateRandomHash } from '../src';
import { compare } from 'bcrypt';

const user = {
  password: 'myPassword',
};

describe('utils/cipher', () => {
  it('Should encrypt a password', async () => {
    const hashedPassword = await getHashedPassword(user.password, 10);
    expect(hashedPassword).not.toEqual(user.password);
  });

  it('Should return true when a correct password is being compared', async () => {
    const hashedPassword = await getHashedPassword(user.password, 10);
    const result = await comparePassword(user.password, hashedPassword);
    expect(result).toEqual(true);
  });

  it('Should return false when an incorrect password is provided', async () => {
    const hashedPassword = await getHashedPassword(user.password, 10);
    const result = await comparePassword('IncorrectPW', hashedPassword);
    expect(result).toEqual(false);
  });

  it('Should return a random hashed string', async () => {
    const hashedString = generateRandomHash();
    expect(hashedString).toHaveLength(64);
  });
});
