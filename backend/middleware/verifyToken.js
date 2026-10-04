import jwt from 'jsonwebtoken';
import User from '../models/userSchema.js';
import ErrorResponse from '../utils/ErrorResponse.js';

// Loads the logged-in user into req.user, or rejects with 401.
const verifyToken = async (req, res, next) => {
  let uid;
  try {
    ({ uid } = jwt.verify(req.cookies.token, process.env.JWT_SECRET));
  } catch {
    throw new ErrorResponse('Please login', 401);
  }
  req.user = await User.findById(uid);
  if (!req.user) throw new ErrorResponse('Please login', 401);
  next();
};

export default verifyToken;
