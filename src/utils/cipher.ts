import jsonwebtoken from 'jsonwebtoken';
import bcryptNodejs from 'bcrypt-nodejs';

/**
 * Get a hashed password
 * @param password
 * @return {String}
 */
export function getHashedPassword(password): string {
    return bcryptNodejs.hashSync(password);
}

/**
 * compare user password hash with unhashed password
 * @param password
 * @param hashedPw
 * @returns {Boolean} isPasswordSame
 */
export function comparePassword(password, hashedPw): boolean {
    return bcryptNodejs.compareSync(password, hashedPw);
}

/**
 * Create a new json webtoken
 * @param user
 * @returns {Object}
 */
export function createWebtoken(user, jwtSettings): any {
    return jsonwebtoken.sign({ user },
        jwtSettings.secret, {
            algorithm: jwtSettings.algorithm,
            expiresIn: `${jwtSettings.expiresIn}s`, // Expires in seconds
            issuer: jwtSettings.issuer,
            audience: jwtSettings.audience,
        });
}
