import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { sign as jwtSign, verify as jwtVerify, decode as jwtDecode, Secret, SignOptions } from 'jsonwebtoken';
import { omit } from 'lodash';
/**
 * Get a hashed password
 * @param {String} password
 * @return {Promise}
 */
export function getHashedPassword(password: string, saltCount: number): Promise < string > {
  return bcrypt.hash(password, saltCount);
}


/**
 * Generate a random hashed string
 * @param {String} algorithm
 * @param {String} secret
 * @returns {String} hash
 */
export function generateRandomHash(algorithm = 'sha256', secret = Math.random().toString(36).slice(-8)) {
  return crypto.createHmac(algorithm, secret).digest('hex');
}


/**
 * compare user password hash with unhashed password
 * @param {String} password
 * @param {String} hashedPw
 * @returns {Boolean} isPasswordSame
 */
export function comparePassword(password: string, hashedPw: string): Promise < boolean > {
  return bcrypt.compare(password, hashedPw);
}


/**
 * Create a new json webtoken
 * @param {Object} user
 * @param {String} secretOrKey
 * @param {SignOptions} jwtSettings
 * @returns {Promise} jwtToken
 */
export function createJwt(payload: Object, secretOrKey: Secret, jwtSettings: SignOptions): Promise < {} > {
  return new Promise((resolve, reject) => {
    // Make sure we remove secretOrKey from the config we pass to jsonwebtoken
    return jwtSign(payload, secretOrKey, omit(jwtSettings, ['secretOrKey']), (error, jwtToken) => {
      if (error) reject(`Something went wrong trying to create a json webtoken. Actual error: ${error}`);
      resolve(jwtToken);
    });
  });
}


/**
 * Verify whether the provided jwt token is valid and return decoded
 * @param {String} token
 * @param {String} secretOrKey
 * @returns {Promise} decoded JWT token
 */
export function verifyJwt(token: string, secretOrKey: string | Buffer, jwtSettings: SignOptions): Promise < {} > {
  return new Promise((resolve, reject) => {
    // Make sure we remove secretOrKey from the config we pass to jsonwebtoken
    jwtVerify(token, secretOrKey, omit(jwtSettings, ['secretOrKey']), (error, decoded) => {
      if (error) reject(`Something went wrong trying to create a json webtoken. Actual error: ${error}`);
      resolve(decoded);
    });
  });
}


/**
 * Decode a json webtoken without validation
 * @param token
 * @returns {Object} payload
 */
export function decodeJwt(token: string): Object {
  return jwtDecode(token);
}
