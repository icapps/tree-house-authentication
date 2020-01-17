import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';

/**
 * Get a hashed password using bcrypt
 */
export function getHashedPassword(password: string, saltCount: number): Promise<string> {
  return bcrypt.hash(password, saltCount);
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
export function comparePassword(password: string, hashedPw: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPw);
}

/**
 * Hash password
 */
export function hashPassword(password: string, { algorithm, key, iv }: IHashOptions): string {
  const ivBuffer = Buffer.from(iv);

  const encryptor = crypto.createCipheriv(algorithm, key, ivBuffer);
  encryptor.setEncoding('hex');
  encryptor.write(password);
  encryptor.end();
  return encryptor.read().toString();
}

/**
 * Dehash password
 */
export function dehashPassword(password: string, { algorithm, key, iv }: IHashOptions): string {
  const ivBuffer = Buffer.from(iv);
  const decryptor = crypto.createDecipheriv(algorithm, key, ivBuffer);
  const decryptedText = decryptor.update(password, 'hex');

  return `${decryptedText}${decryptor.final('utf-8')}`;
}

export interface IHashOptions {
  algorithm: string;
  key: string;
  iv: string;
}
