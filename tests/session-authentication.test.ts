import { getSession } from '../src';

describe('#Session authentication', () => {
  it('Should return a valid session middleware function', async () => {
    const session = await getSession({ secret: 'testSecret' });
    expect(session).toBeInstanceOf(Function);
  });
});
