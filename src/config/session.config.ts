import { SessionOptions } from 'express-session';

export const DEFAULT_SESSION_CONFIG: SessionOptions = {
  secret: 'mySuperSecretSecret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true,
  },
};
