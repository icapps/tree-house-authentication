import { sign as jsonwebtokenSign, Secret, SignOptions } from 'jsonwebtoken';
import * as bcryptNodejs from 'bcrypt-nodejs';


/**
 * Get a hashed password
 * @param {String} password
 * @return {String}
 */
export function getHashedPassword(password: string): string {
  return bcryptNodejs.hashSync(password);
}

/**
 * compare user password hash with unhashed password
 * @param {String} password
 * @param {String} hashedPw
 * @returns {Boolean} isPasswordSame
 */
export function comparePassword(password: string, hashedPw: string): boolean {
  return bcryptNodejs.compareSync(password, hashedPw);
}

/**
 * Create a new json webtoken
 * @param {Object} user
 * @param {String|Buffer} secretOrKey
 * @param {SignOptions} jwtSettings
 * @returns {Object}
 */
export function createWebtoken(user: Object, secretOrKey: Secret, jwtSettings: SignOptions): any {
  return jsonwebtokenSign({ user }, secretOrKey, {
    algorithm: jwtSettings.algorithm,
    expiresIn: `${jwtSettings.expiresIn}s`, // Expires in seconds
    issuer: jwtSettings.issuer,
    audience: jwtSettings.audience,
  });
}
