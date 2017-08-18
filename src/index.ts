import BaseAuthentication from './lib/base.authentication';
import PassportAuthentication from './lib/passport.authentication';
import * as CipherUtils from './utils/cipher';

/**
 * Export all exposed variables
 */
module.exports = {
  BaseAuthentication,
  PassportAuthentication,
  CipherUtils,
};
