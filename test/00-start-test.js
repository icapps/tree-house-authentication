
let authentication;
let webtoken;


describe('Cipher helpers', () => {
    it('Hash the current password and compare', () => {
        const hashedPassword = Cipher.getHashedPassword(user.password);
        return expect(Cipher.comparePassword(user.password, hashedPassword)).to.be.true;
    });
});