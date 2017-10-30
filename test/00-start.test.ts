import { getHashedPassword, comparePassword } from '../src/utils/cipher';

const user = {
  password: 'myPassword',
};

describe('Cipher helpers', () => {
  it('Hash the current password and compare', async () => {
    const hashedPassword = await getHashedPassword(user.password, 10);
    return expect(await comparePassword(user.password, hashedPassword)).toBe(true);
  });
});
