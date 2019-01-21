import * as ldap from 'ldapjs';

export function createLdapClient(clientOptions, dnString, password) : Promise<ldap.Client>  {
  return new Promise((resolve, reject) => {
    const client : ldap.Client = ldap.createClient(clientOptions);

    client.bind(dnString, password, (err) => {
      if (err) reject(err);
      resolve(client);
    });
  });
}

// tslint:disable-next-line:prefer-array-literal
export function searchUser(ldapClient : ldap.Client , dnString: string, filterOptions : ldap.SearchOptions) : Promise<Array<Object>> {
  return new Promise((resolve , reject) => {
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
