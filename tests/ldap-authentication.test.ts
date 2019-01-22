import * as ldap from 'ldapjs';
import { createLdapClient, searchUser } from '../src/lib/ldap-authentication';
import { EventEmitter } from 'events';

const clientOptions = {
  url: 'ldap://ldap.forumsys.com',
  port: '389',
};

const dnString = 'cn=read-only-admin,dc=example,dc=com';
const password = 'password';

describe('ldap-authentication', () => {
  const mockBindFn = jest.fn((_username, _password, callbackFn) => callbackFn());
  const mockSearchFn = jest.fn((_ldapClient, _dnString, _filterOptions, searchCallbackFn) => searchCallbackFn());
  const ldapSpy = jest.spyOn(ldap, 'createClient').mockReturnValue({
    url: {
      protocol: 'ldap:',
      host: 'ldap.forumsys.com',
      port: 389,
    },
    bind: mockBindFn,
    search: mockSearchFn,
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createLdapClient', () => {
    it('Should create an ldapjs client instance that is connected with the server', async () => {
      mockBindFn.mockImplementationOnce((_username, _password, callbackFn) => callbackFn()); // No result means success
      const newClient = await createLdapClient(clientOptions, dnString, password);

      expect(ldapSpy).toHaveBeenCalledTimes(1);
      expect(mockBindFn).toHaveBeenCalledTimes(1);

      expect(newClient.url.protocol).toEqual('ldap:');
      expect(newClient.url.host).toEqual('ldap.forumsys.com');
      expect(newClient.url.port).toEqual(389);
    });

    it('Should throw an error when it cannot connect with the server', async () => {
      mockBindFn.mockImplementationOnce((_username, _password, callbackFn) => callbackFn(new Error('Invalid credentials')));

      expect.assertions(2);
      try {
        await createLdapClient(clientOptions, dnString, password);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toEqual('Invalid credentials');
      }
    });
  });

  describe('searchUser', () => {
    let client;

    beforeAll(async () => {
      client = await createLdapClient(clientOptions, dnString, password);
    });

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

      const entry = {
        object: expectedToFind,
      };

      const dnString = 'dc=example,dc=com';
      const filter = {
        filter: '(objectClass=*)',
        scope: 'sub',
      };

      const emitter = new EventEmitter();

      mockSearchFn.mockImplementationOnce((_dnString, _filterOptions, searchCallbackFn) => searchCallbackFn(false, emitter));

      setTimeout(() => {
        emitter.emit('searchEntry', entry);
        emitter.emit('end', 'ok');
      },         200);

      const users = await searchUser(client, dnString, filter);

      expect(users).toContainEqual(expectedToFind);
    });

    it('Should return an error on bad searchrequest', async () => {
      const dnString = '';
      const filter = {
        scope: 'sub',
      };

      const emitter = new EventEmitter();
      mockSearchFn.mockImplementationOnce((_dnString, _filterOptions, searchCallbackFn) => searchCallbackFn(false, emitter));

      setTimeout(() => {
        emitter.emit('error', new Error('Bad search request'));
      },         400);

      expect.assertions(1);
      try {
        await searchUser(client, dnString, filter);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });

    it('Should return an error when it cannot get a search result', async () => {
      const dnString = '';
      const filter = {
        scope: 'sub',
      };

      const emitter = new EventEmitter();
      mockSearchFn.mockImplementationOnce((_dnString, _filterOptions, searchCallbackFn) => searchCallbackFn(new Error()));

      expect.assertions(1);
      try {
        await searchUser(client, dnString, filter);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });
});
