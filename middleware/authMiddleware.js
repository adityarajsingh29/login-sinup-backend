import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  // Read header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the database and attach to req, excluding password
      req.user = await User.findById(decoded.id);
      
      if (!req.user) {
        res.status(401);
        return next(new Error('Not authorized, user not found'));
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      next(error); // Passes JsonWebTokenError or TokenExpiredError to error handler
    }
  }

  if (!token) {
    res.status(401);
    next(new Error('Not authorized, no token provided'));
  }
};
