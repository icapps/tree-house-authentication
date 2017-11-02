export interface TreeAuthentication {
  authenticate(jwtToken: string | Object): Promise < {} > ;
}
