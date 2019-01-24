import * as ldap from 'ldapjs';

/**
 * Creates an ldap-client object and connects to the directory server
 */
export function createLdapClient(clientOptions : ldap.ClientOptions, dnString : string, password: string): Promise<ExtendedLdapClient> {
  return new Promise((resolve, reject) => {
    const client = <ExtendedLdapClient>ldap.createClient(clientOptions);

    client.bind(dnString, password, (err) => {
      if (err) return reject(err);
      resolve(client);
    });
  });
}

/**
 * Searches the directory with given dn and filter options and returns the matching objects
 */
export function searchUsers(ldapClient: ldap.Client, dnString: string, filterOptions: ldap.SearchOptions): Promise<Object[]> {
  return new Promise((resolve, reject) => {
    const users : Object[] = [];

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
