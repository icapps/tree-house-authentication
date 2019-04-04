import * as speakeasy from 'speakeasy';
import * as qrcode from 'qrcode';

/**
 * Return a two factor secret
 */
export function generate2FAKey(options?: speakeasy.GenerateSecretOptions): speakeasy.GeneratedSecret {
  return speakeasy.generateSecret(options);
}

/**
 * Return a QR code string and user secret
 */
export function generateQrCode(options?: speakeasy.GenerateSecretOptions): Promise<QrCodeResponse> {
  return new Promise((resolve, reject) => {
    const key = generate2FAKey(options);
    qrcode.toDataURL(key.otpauth_url, {}, (error, imageData) => {
      if (error) return reject(error);
      return resolve({ imageData, secret: key.base32, url: key.otpauth_url });
    });
  });
}

/**
 * Verify whether a generated token matches the secret
 */
export function verifyToken(secret: string, token: string): boolean {
  return speakeasy.totp.verify({ secret, token, encoding: 'base32' });
}

// Interfaces
export interface QrCodeResponse {
  secret: string;
  imageData: string;
  url: string;
}
