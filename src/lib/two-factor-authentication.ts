import * as speakeasy from 'speakeasy';
import * as qrcode from 'qrcode';

/**
 * Return a two factor secret
 */
export function generate2FASecret(options?: speakeasy.GenerateSecretOptions): speakeasy.Key {
  return speakeasy.generateSecret(options);
}

/**
 * Return a QR code string and user secret
 */
export function generateQrCode(options?: speakeasy.GenerateSecretOptions): Promise<{ secret: string, imageData: string, url: string }> {
  return new Promise((resolve, reject) => {
    const secret = generate2FASecret(options);
    qrcode.toDataURL(secret.otpauth_url, (error, imageData) => {
      if (error) return reject(error);
      return resolve({ imageData, secret: secret.base32, url: secret.otpauth_url });
    });
  });
}

/**
 * Verify whether a generated token matches the secret
 */
export function verifyToken(secret: string, token: string): boolean {
  return speakeasy.totp.verify({ secret, token, encoding: 'base32' });
}
