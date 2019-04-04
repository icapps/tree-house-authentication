import { generateQrCode, verifyToken } from '../src/lib/two-factor-authentication';
import * as speakeasy from 'speakeasy';
import * as qrcode from 'qrcode';

describe('#Two factor authentication', () => {
  it('Should return a valid qr code and user secret', async () => {
    const result = await generateQrCode();
    expect(result).toMatchObject({
      imageData: expect.any(String),
      secret: expect.any(String),
      url: expect.any(String),
    });
  });

  it('Should throw an error when QR generation fails', async () => {
    const qrSpy = jest.spyOn(qrcode, 'toDataURL').mockImplementationOnce((_param, { }, callback) => callback(new Error('Something wong!'), null));
    expect.assertions(3);
    try {
      await generateQrCode();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual('Something wong!');
      expect(qrSpy).toHaveBeenCalledTimes(1);
    }
  });

  it('Should return true when the token is valid', async () => {
    const { secret } = await generateQrCode();

    // Generate token
    const token = speakeasy.totp({
      secret,
      encoding: 'base32',
    });

    const result = verifyToken(secret, token);
    expect(result).toEqual(true);
  });

  it('Should return true when the token is invalid', async () => {
    const { secret } = await generateQrCode();
    const result = verifyToken(secret, 'invalidToken');
    expect(result).toEqual(false);
  });
});
