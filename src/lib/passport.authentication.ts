import * as passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';

import {
  DEFAULT_LOCAL_STRATEGY_CONFIG as DEF_LOCAL,
  DEFAULT_JWT_CONFIG as DEF_JWT,
} from './passport.config';
import BaseAuthentication from './base.authentication';
import { createWebtoken } from './../utils/cipher';


export default class PassportAuthentication extends BaseAuthentication {
  localStrategyConfig: any; // TODO: Convert when tree-house uses typescript
  jwtStrategyConfig: any; // TODO: Convert when tree-house uses typescript

  /**
   * Expects a function with first parameters inputfields, and second callback function
   * @param {any} fn
   * @memberOf PassportAuthenticaton
   */
  setLocalStrategy = (localConfig = DEF_LOCAL, fn: Function) => {
    // console.log('Set a new strategy', fn);
    this.localStrategyConfig = Object.assign({}, localConfig, {
      passReqToCallback: false,
    });

    // Convert the callback function needed to a function returning a Promise
    const localStrategy = new LocalStrategy(this.localStrategyConfig,
      (email, password, next: any) => {
        fn(email, password)
          .then(result => next(null, result))
          .catch(error => next(error, null));
      });

    // Use this local strategy
    passport.use(localStrategy);
  }


  /**
   * Expects a function with first parameter payload, and second callback function
   * @param {any} fn
   * @memberOf PassportAuthenticaton
   */
  setJwtStrategy(jwtConfig = DEF_JWT, fn) {
    this.jwtStrategyConfig = Object.assign({}, jwtConfig, {
      jwtFromRequest: ExtractJwt.fromAuthHeader(),
      secretOrKey: jwtConfig.secret,
      authScheme: jwtConfig.authScheme,
      passReqToCallback: false,
    });

    // Convert the callback function needed to a function returning a Promise
    passport.use(new JwtStrategy(this.jwtStrategyConfig, (payload, next) => {
      fn(payload)
        .then(result => next(null, result))
        .catch(error => next(error, null));
    }));
  }

  /**
   * Create and get a JWT token using the Cipher helper
   * @param {any} user
   * @returns String
   *
   * @memberOf PassportAuthenticaton
   */
  getJwtToken(user) {
    if (this.jwtStrategyConfig) {
      return createWebtoken(user, this.jwtStrategyConfig.secretOrKey, this.jwtStrategyConfig);
    }
    throw new Error('JWT Strategy configuration not properly set');
  }

  /**
   * Authenticate depending on authentication type (local/jwt)
   *
   * @param {Request} req
   * @param {string} [type='local']
   * @returns { Promise }
   *
   * @memberOf PassportAuthenticaton
   */
  authenticate(req: any, type: string = 'local') {
    return new Promise((resolve, reject) => {
      passport.authenticate(type, (error, user) => {
        if (error) return reject(error);
        else if (!user) return reject('User not found');
        return resolve(user);
      }).bind(req);
    });
  }
}
