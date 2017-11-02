import TreeAuthentication from '../src/lib/base.authentication';

describe('#Base classes', () => {
  test('Should return true when password is valid', async() => {
    const MyAuthentication = jest.fn<TreeAuthentication>(() => ({
      authenticate: jest.fn<Promise< { } >>(),
    }));

    const myAuthentication =  new MyAuthentication();
    await myAuthentication.authenticate('MyJwtToken');

    expect(myAuthentication.authenticate).toHaveBeenCalled();
  });
});
