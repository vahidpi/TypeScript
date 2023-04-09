import * as jwt from 'express-jwt';
import { secrets } from './secrets';

const authMiddleware = jwt.expressjwt({
  secret: secrets.authSecret,
  algorithms: ['HS256']
});

export default authMiddleware;