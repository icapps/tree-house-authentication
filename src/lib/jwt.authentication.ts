import { DEFAULT_JWT_CONFIG } from '../config/jwt.config';
import { createJwt, verifyJwt } from '../utils/cipher';

// Interfaces
import { TreeAuthentication } from './base.authentication';

export default class JwtAuthentication implements TreeAuthentication {
  configuration: Object;

  constructor(configuration) {
    this.configuration = Object.assign({}, DEFAULT_JWT_CONFIG, configuration);
  }


  /**
   * Create a new JWT token
   * @param {any} payload
   * @returns {Object} payload
   */
  createToken = async(payload) => {
    return await createJwt(payload, this.configuration['secretOrKey'], this.configuration);
  }


  /**
   * Authenticate whether the provided JWT token is valid
   * @param {String | Buffer} jwtToken
   * @returns {Object} payload
   */
  authenticate = async(jwtToken) => {
    if (!jwtToken) throw new Error('JWT token not provided or incorrect');
    return await verifyJwt(jwtToken, this.configuration['secretOrKey'], this.configuration);
  }

  // TODO: Implement decode

}
