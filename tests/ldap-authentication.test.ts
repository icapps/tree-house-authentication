import { createLdapClient, searchUser } from '../src/lib/ldap-authentication';

async function getClient() {
  const clientOptions = {
    url: 'ldap://ldap.forumsys.com',
    port: '389',
  };
  const dnString = 'cn=read-only-admin,dc=example,dc=com';
  const password = 'password';

  return await createLdapClient(clientOptions, dnString, password);
}

describe('ldap-authentication', () => {
  describe('createLdapClient', () => {
    it('Should create an ldapjs client instance that is connected with the server', async () => {
      const client = await getClient();

      expect(client.url.protocol).toEqual('ldap:');
      expect(client.url.host).toEqual('ldap.forumsys.com');
      expect(client.url.port).toEqual(389);

      client.unbind();
    });

    it('Should throw an error when it cannot connect with the server', async () => {
      const clientOptions = {
        url: 'ldap://ldap.forumsys.com',
        port: '389',
      };
      const dnString = 'cn=read-only-admin,dc=example,dc=com';
      const wrongPassword = 'wrongPassword';

      expect.assertions(1);
      try {
        const client = await createLdapClient(clientOptions, dnString, wrongPassword);
        client.unbind();
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }

    });
  });

  describe('searchUser', () => {
    it('Should return the requested objects upon matching filter and permissions of client', async () => {
      const expectedToFind = {
        dn: 'uid=galieleo,dc=example,dc=com',
        controls: [],
        objectClass: ['inetOrgPerson', 'organizationalPerson', 'person', 'top'],
        cn: 'Galileo Galilei',
        sn: 'Galilei',
        uid: 'galieleo',
        mail: 'galieleo@ldap.forumsys.com',
      };

      const client = await getClient();
      const dnString = 'dc=example,dc=com';
      const filter = {
        filter: '(objectClass=*)',
        scope: 'sub',
      };

      // returns an array of users (CONTAINS MORE THAN 1)
      const users = await searchUser(client, dnString, filter);

      // Close connection
      client.unbind();

      expect(users).toContainEqual(expectedToFind);
    });

    it('Should return the requested user', async () => {
      const expectedUser = {
        dn: 'uid=curie,dc=example,dc=com',
        controls: [],
        uid: 'curie',
        objectClass: ['inetOrgPerson', 'organizationalPerson', 'person', 'top'],
        cn: 'Marie Curie',
        sn: 'Curie',
        mail: 'curie@ldap.forumsys.com' };

      const client = await getClient();
      const dnString = 'uid=curie,dc=example,dc=com';
      const filter = {
        filter: '(objectClass=*)',
        scope: 'sub',
      };

      const users = await searchUser(client, dnString, filter);

      client.unbind();

      expect(users).toContainEqual(expectedUser);
      expect(users.length).toEqual(1);
    });

    it('Should return an error on bad searchrequest', async () => {
      const client = await getClient();
      const dnString = '';
      const filter = {
        scope: 'sub',
      };

      expect.assertions(1);
      try {
        const users = await searchUser(client, dnString, filter);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }

      client.unbind();
    });
  });
});
