export const DEFAULT_LOCAL_STRATEGY_CONFIG = {
    usernameField: 'email',
    passwordField: 'password',
};

export const DEFAULT_JWT_CONFIG = {
    secret: '5kZxE|gZu1ODB183s772)/3:l_#5hU3Gn5O|2ux3&lhN@LQ6g+"i$zqB_C<6',
    algorithm: 'HS256',
    expiresIn: 24 * 60 * 60,
    issuer: 'treehouse',
    audience: 'TREEHOUSE',
    authScheme: 'X-Session-Id',
};
