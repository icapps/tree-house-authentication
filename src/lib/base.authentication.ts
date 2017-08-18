export default class BaseAuthentication {
  /**
   * Authenticate the current user
   * @memberOf BaseAuthentication
   */
  // TODO: Overload methods for different implementations...
  authenticate(request: any, options: any): any {
    return Promise.resolve({ request, options });
  }
}
