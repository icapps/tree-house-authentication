import { Issuer } from 'openid-client';
import jwksClient = require('jwks-rsa');
import { Algorithm } from 'jsonwebtoken';

import { verifyJwt, decodeJwt } from './jwt-authentication';

/**
 * Authenticate whether the provided SSO token is valid
 * @param {String} token
 * @returns {Object}
 */
export async function authenticateSso(token: string): Promise<{}> {
  if (token === '') throw new Error('SSO token is empty.');

  const { header, payload } = decodeJwt(token, { complete: true }) as CompleteJWTToken;
  const { metadata } = await Issuer.discover(payload.iss);

  // console.log('metadata: ', metadata);
  const secret = await getKey(metadata.jwks_uri, header.kid);

  const options = {
    issuer: payload.iss,
    algorithm: header.alg,
    aud: payload.aud,
    expiresIn: payload.exp,
  };

  return verifyJwt(token, secret, options);
}

/**
 * Get key from a JSON Web Key Set endpoint
 * @param {String} jwksUri
 * @param {String} token
 * @returns {String}
 */
export async function getKey(jwksUri: string, token: string): Promise<string> {
  const client = jwksClient({
    jwksUri,
  });

  return new Promise((resolve, reject) => {
    client.getSigningKey(token, (error, key: any) => {
      if (error) return reject(error);

      const signingKey = key.rsaPublicKey || key.publicKey;
      return resolve(signingKey);
    });
  });
}

interface CompleteJWTToken {
  header: {
    typ: string,
    kid: string,
    alg: Algorithm,
  };
  payload: {
    sub: string,
    iss: string,
    tokenName: string,
    nonce: string,
    aud: string,
    azp: string,
    auth_time: number,
    realm: string,
    exp: number,
    tokenType: string,
    iat: number,
  };
}
