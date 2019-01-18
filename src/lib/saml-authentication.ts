import * as saml from 'samlify';
import { IdentityProvider } from 'samlify/types/src/entity-idp';
import { ServiceProvider } from 'samlify/types/src/entity-sp';
import { ServiceProviderSettings, IdentityProviderSettings } from 'samlify/types/src/types';

// service proivder
// Our node applications is the service provider
export function createServiceProvider(xmlMetaData: string | Buffer, args: ServiceProviderSettings = {}): ServiceProvider {
  return saml.ServiceProvider({ ...args, metadata: xmlMetaData });
}

// The external party
export function createIdentityProvider(xmlMetaData: string | Buffer, args: IdentityProviderSettings = {}): IdentityProvider {
  return saml.IdentityProvider({ ...args, metadata: xmlMetaData });
}

// Flow

// 1. The user tries to log in to service provider from a browser

// 2. Service provider generates SAML REQUEST
export function createLoginRequest(sp: ServiceProvider, idp: IdentityProvider, customTagReplacement: string = 'redirect') {
  console.log('fsd', idp);
  const { context } = sp.createLoginRequest(idp, customTagReplacement);
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
export async function validateSAMLResponse(sp: ServiceProvider, idp: IdentityProvider, samlResponse: Request) {

  // create request from samlresponse (req.body.samlResponse = samlResponse)
  const parsedResponse = await sp.parseLoginResponse(idp, 'post', samlResponse);
  return parsedResponse;
}

// LOGOUT

export async function createSSOLogout(sp: ServiceProvider, idp: IdentityProvider, user: any, redirectUrl?: string) {
  const result = await sp.createLogoutRequest(idp, 'redirect', user, redirectUrl);
  return result;
}
