import * as express from 'express';

export interface TreeAuthentication {
  authenticate(request: express.Request, options): Promise < {} > ;
  authenticate(request: express.Request, res: express.Response, options): Promise < {} > ;
}
