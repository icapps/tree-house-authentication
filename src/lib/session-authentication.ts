import * as session from 'express-session';
import { RequestHandler } from 'express';
import { DEFAULT_SESSION_CONFIG } from '../config/session.config';

/**
 * Return an express session middleware
 */
export function getSession(options: session.SessionOptions): RequestHandler {
  const allOptions: session.SessionOptions = Object.assign({}, DEFAULT_SESSION_CONFIG, options);
  return session(allOptions);
}
