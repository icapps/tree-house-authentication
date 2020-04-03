import { Algorithm } from 'jsonwebtoken';

export const DEFAULT_JWT_CONFIG = {
  algorithm: 'HS256' as Algorithm,
  expiresIn: '7d',
  audience: 'TREEHOUSE-AUTH',
  issuer: 'treehouse-authentication',
  secretOrKey: '5kZxE|gZu1ODB183s772)/3:l_#5hU3Gn5O|2ux3&lhN@LQ6g+"i$zqB_C<6',
};

export const DEFAULT_JWT_DECODE_OPTIONS = {
  complete: false,
  json: false,
};
