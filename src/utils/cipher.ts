import { sign as jsonwebtokenSign, Secret, SignOptions } from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';


/**
 * Get a hashed password
 * @param {String} password
 * @return {Promise}
 */
export function getHashedPassword(password: string, saltCount: number):  Promise <string> {
  return bcrypt.hash(password, saltCount);
}


/**
 * compare user password hash with unhashed password
 * @param {String} password
 * @param {String} hashedPw
 * @returns {Boolean} isPasswordSame
 */
export function comparePassword(password: string, hashedPw: string): Promise <boolean> {
  return bcrypt.compare(password, hashedPw);
}


/**
 * Create a new json webtoken
 * @param {Object} user
 * @param {String|Buffer} secretOrKey
 * @param {SignOptions} jwtSettings
 * @returns {Object}
 */
export function createWebtoken(user: Object, secretOrKey: Secret, jwtSettings: SignOptions): string {
  return jsonwebtokenSign({ user }, secretOrKey, {
    algorithm: jwtSettings.algorithm,
    expiresIn: `${jwtSettings.expiresIn}s`, // Expires in seconds
    issuer: jwtSettings.issuer,
    audience: jwtSettings.audience,
  });
}
