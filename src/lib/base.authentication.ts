export default interface TreeAuthentication {
  authenticate: (jwtToken: string | Object) => Promise < {} > ;
}
