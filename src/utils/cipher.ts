import * as jsonwebtoken from 'jsonwebtoken';
import * as bcryptNodejs from 'bcrypt-nodejs';


/**
 * Get a hashed password
 * @param password
 * @return {String}
 */
export function getHashedPassword(password: String): string {
  return bcryptNodejs.hashSync(password);
}

/**
 * compare user password hash with unhashed password
 * @param password
 * @param hashedPw
 * @returns {Boolean} isPasswordSame
 */
export function comparePassword(password: String, hashedPw: String): boolean {
  return bcryptNodejs.compareSync(password, hashedPw);
}

/**
 * Create a new json webtoken
 * @param {Object} user
 * @param {Object} jwtSettings
 * @returns {Object}
 */
export function createWebtoken(user: Object, jwtSettings: Object): any {
  return jsonwebtoken.sign({ user },
    jwtSettings.secret, {
      algorithm: jwtSettings.algorithm,
      expiresIn: `${jwtSettings.expiresIn}s`, // Expires in seconds
      issuer: jwtSettings.issuer,
      audience: jwtSettings.audience,
    });
}
