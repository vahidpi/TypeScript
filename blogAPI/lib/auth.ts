import * as jwt from 'express-jwt';

// TODO add secret key in env. variables file
const authMiddleware = jwt.expressjwt({
  secret: '---',
  algorithms: ['HS256']
});

export default authMiddleware;