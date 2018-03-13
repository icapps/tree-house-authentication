import { omit } from 'lodash';
import { sign as jwtSign, verify as jwtVerify, decode as jwtDecode, Secret, SignOptions } from 'jsonwebtoken';
import { DEFAULT_JWT_CONFIG } from '../config/jwtConfig';


/**
 * Create a new json webtoken
 */
export function createJwt(payload: Object, secretOrKey: Secret, jwtSettings: SignOptions = DEFAULT_JWT_CONFIG): Promise<{}> {
  return new Promise((resolve, reject) => {
    // Make sure we remove secretOrKey from the config we pass to jsonwebtoken
    jwtSign(payload, secretOrKey, omit(jwtSettings, ['secretOrKey']), (error, jwtToken) => {
      if (error) reject(`Something went wrong trying to create a json webtoken. Actual error: ${error}`);
      resolve(jwtToken);
    });
  });
}


/**
 * Verify whether the provided jwt token is valid and return decoded information
 */
export function verifyJwt(token: string, secretOrKey: string | Buffer, jwtSettings: SignOptions = DEFAULT_JWT_CONFIG): Promise<{}> {
  return new Promise((resolve, reject) => {
    // Make sure we remove secretOrKey from the config we pass to jsonwebtoken
    jwtVerify(token, secretOrKey, omit(jwtSettings, ['secretOrKey']), (error, decoded) => {
      if (error) reject(`Something went wrong trying to verify the json webtoken. Actual error: ${error}`);
      resolve(decoded);
    });
  });
}


/**
 * Authenticate whether the provided JWT token is valid
 */
export function authenticateJwt(token: string, jwtSettings: SignOptions = DEFAULT_JWT_CONFIG): Promise<{}> {
  if (token === '') throw new Error('JWT token not provided.');
  return verifyJwt(token, jwtSettings['secretOrKey'], jwtSettings);
}


/**
 * Decode a json webtoken without validation
 */
export function decodeJwt(token: string): null | object | string {
  return jwtDecode(token);
}
