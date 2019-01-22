import * as ldap from 'ldapjs';

export function createLdapClient(clientOptions, dnString, password): Promise<ExtendedLdapClient> {
  return new Promise((resolve, reject) => {
    const client = <ExtendedLdapClient>ldap.createClient(clientOptions);

    client.bind(dnString, password, (err) => {
      if (err) reject(err);
      resolve(client);
    });
  });
}

export function searchUser(ldapClient: ldap.Client, dnString: string, filterOptions: ldap.SearchOptions): Promise<Object[]> {
  return new Promise((resolve, reject) => {
    const users = [];

    ldapClient.search(dnString, filterOptions, (err, result) => {
      if (err) { return reject(err); }

      result.on('searchEntry', (entry) => {
        users.push(entry.object);
      });

      result.on('error', (err) => {
        return reject(err);
      });

      result.on('end', () => {
        resolve(users);
      });
    });
  });
}

// Due to incorrect ldap definitions
export interface ExtendedLdapClient extends ldap.Client {
  url: {
    protocol: string;
    host: string;
    port: number;
  };
}
