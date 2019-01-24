// SSO flow (Service provider initiated)

// 1. The user tries to log in to service provider from a browser
// 2. Service provider generates SAML REQUEST
// 3. The browser redirects the user to an SSO URL
// 4. Users sends request and gets a SAML resposne
// 5. IDP returns the encoded SAML response
// 6. Verify SAML response

import * as saml from 'samlify';
import { Request } from 'express';
import { IdentityProvider } from 'samlify/types/src/entity-idp';
import { ServiceProvider } from 'samlify/types/src/entity-sp';
import { ServiceProviderSettings, IdentityProviderSettings } from 'samlify/types/src/types';

/**
 * Creates a Serviceprovider object
 */
export function createServiceProvider(xmlMetaData: string | Buffer, args: ServiceProviderSettings = {}): ServiceProvider {
  return saml.ServiceProvider({ ...args, metadata: xmlMetaData });
}

/**
 * Creates an Identityprovider object
 */
export function createIdentityProvider(xmlMetaData: string | Buffer, args: IdentityProviderSettings = {}): IdentityProvider {
  return saml.IdentityProvider({ ...args, metadata: xmlMetaData });
}

/**
 * Creates a SSO login request (service provider initiated)
 */
export function createLoginRequest(sp: ServiceProvider, idp: IdentityProvider, customTagReplacement: string = 'redirect') {
  const { context } = sp.createLoginRequest(idp, customTagReplacement);
  return context;
}

/**
 * Parses SAML response to readable XML
 */
export async function parseSAMLResponse(sp: ServiceProvider, idp: IdentityProvider, samlResponse: Request) {
  const parsedResponse = await sp.parseLoginResponse(idp, 'post', samlResponse);
  return parsedResponse;
}

/**
 * Creates Single logout url for  a user (service provider initiated).
 */
export async function createLogout(sp: ServiceProvider, idp: IdentityProvider, user: any, redirectUrl?: string) {
  return await sp.createLogoutRequest(idp, 'redirect', user, redirectUrl);
}
