import { getHashedPassword, comparePassword, generateRandomHash, hashPassword, dehashPassword } from '../src';

const user = {
  password: 'myPassword',
};

describe('utils/cipher', () => {
  describe('getHashedPassword - comparePassword', () => {
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
  });

  describe('generateRandomHash', () => {
    it('Should return a random hashed string', async () => {
      const hashedString = generateRandomHash();
      expect(hashedString).toHaveLength(64);
    });
  });

  describe('hashPassword  - dehashPassword', () => {
    const hashOptions = {
      algorithm: 'aes-192-cbc',
      key: 'pYDsIDpfwwTb74ntuL9emTue',
      iv: 'Q14RjVp3kv5psnIh',
    };

    it('Should hash and dehash the password', () => {
      const password = 'icapps';
      const hashed = hashPassword(password, hashOptions);
      expect(typeof hashed).toEqual('string');
      expect(hashed).not.toEqual(password);

      const result = dehashPassword(hashed, hashOptions);
      expect(result).toEqual(password);
    });
  });
});
