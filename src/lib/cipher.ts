import * as crypto from 'crypto';

/**
 * generates random string of characters i.e salt
 */
function generateRandomString(length: number): string {
  return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}

/**
 * Hash password with sha512
 */
function sha512(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 2048, 32, 'sha512').toString('hex');
}

/**
 * Get a hashed password
 */
export function getHashedPassword(password: string, saltCount: number): string {
  const salt = generateRandomString(saltCount);
  const hash = sha512(password, salt);
  return [salt, hash].join('$');
}

/**
 * Generate a random hashed string
 */
export function generateRandomHash(algorithm = 'sha256', secret = Math.random().toString(36).slice(-8)) {
  return crypto.createHmac(algorithm, secret).digest('hex');
}

/**
 * compare user password hash with unhashed password
 */
export function comparePassword(password: string, hashedPw: string): boolean {
  const [salt, originalHash] = hashedPw.split('$');
  const hash = sha512(password, salt);
  return hash === originalHash;
}
