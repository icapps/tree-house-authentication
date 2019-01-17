import * as saml from 'samlify';
import { IdentityProvider } from 'samlify/types/src/entity-idp';
import { ServiceProvider } from 'samlify/types/src/entity-sp';

// service proivder
// Our node applications is the service provider
export function createServiceProvider(metaData : string) {
  return saml.ServiceProvider({
    metadata: metaData,
  });
}

// The external party
export function createIdentityProvider(metaData: string) {
  return saml.IdentityProvider({
    metadata: metaData,
  });
}

// const blablabla = ``;

// Flow

// 1. The user tries to log in to service provider from a browser

// 2. Service provider generates SAML REQUEST
export function createLoginRequest(sp: ServiceProvider , idp: IdentityProvider) {
  const { context } = sp.createLoginRequest(idp, 'redirect');
  return context;
}

// 3. The browser redirects the user to an SSO URL

// 4. Users sends request and gets a SAML resposne

// 5. Auth0 returns the encoded SAML response to the browser

// 6. The browser sends the SAML response to service provider for verification
/*
function verifySAMLRequest() {

}
*/

// 7. If the verification is successful, the user will be logged in to Zagadat and granted access to all the various resources
export function validateSAMLResponse(sp: ServiceProvider , idp: IdentityProvider,  samlResponse : string) {

  // create request from samlresponse (req.body.samlResponse = samlResponse)
  const req = {
    body: {
      samlResponse,
    },
  };

  const parsedResponse = sp.parseLoginResponse(idp, 'post', req);
  return parsedResponse;
}

// LOGOUT

/*
export function createSSOLogout(sp: ServiceProvider, idp: IdentityProvider) {
  // sp.createLogoutRequest(idp);
}

*/
