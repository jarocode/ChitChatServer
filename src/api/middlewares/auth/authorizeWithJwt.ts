import { Request, Response, NextFunction } from 'express';

import { validateToken } from '../../utils/jwt.utils';
import { AppError } from '../../utils/error.utils';

// Define a custom interface for the user information
interface User {
  id: number;
  username: string;
  // Add other user properties as needed
}

// Extend the Request interface to include the 'user' property
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

const authorizeWithJwt = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let jwt = req.headers.authorization;

    // verify request has token
    if (!jwt) {
      return next(new AppError('Invalid token ', 401));
    }

    // remove Bearer if using Bearer Authorization mechanism
    if (jwt.toLowerCase().startsWith('bearer')) {
      jwt = jwt.slice('bearer'.length).trim();
    }

    // verify token hasn't expired yet
    const decodedToken = await validateToken(jwt);

    req.user = decodedToken;

    next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      // res.status(401).json({ success: false, message: 'Expired token' });
      next(new AppError('Expired token', 401));
      return;
    }

    return next(new AppError('Failed to authenticate user', 500));
  }
};

export default authorizeWithJwt;
