import * as CipherUtils from '../src/utils/cipher';
// import PassportAuthentication from '../src/lib/passport.authentication';

const user = {
  password: 'myPassword',
};

describe('Cipher helpers', () => {
  it('Hash the current password and compare', () => {
    const hashedPassword = CipherUtils.getHashedPassword(user.password);
    return expect(CipherUtils.comparePassword(user.password, hashedPassword)).toBe(true);
  });

  it('Hash the current password and compare', () => {
   // const f = new PassportAuthentication();
   // f.setLocalStrategy();
  });
});
