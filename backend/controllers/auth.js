import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userSchema.js';
import ErrorResponse from '../utils/ErrorResponse.js';
import { addKarma } from '../utils/karmaUtils.js';

const DAY = 24 * 60 * 60 * 1000;
const cookieOptions = { httpOnly: true, sameSite: 'none', secure: true };

export const signUp = async (req, res) => {
  const { username, email, password } = req.body;
  if (!password) throw new ErrorResponse('Password is required', 400);
  if (await User.exists({ email })) throw new ErrorResponse('An account with this Email already exist', 409);
  if (await User.exists({ username })) throw new ErrorResponse('An account with this Username already exist', 409);

  await User.create({ username, email, password: await bcrypt.hash(password, 10) });
  res.status(201).send({ status: 'success' });
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user) throw new ErrorResponse('Email does not exist', 404);
  if (!(await bcrypt.compare(password, user.password))) throw new ErrorResponse('Password is incorrect', 401);

  // First login of the day earns karma
  const now = new Date();
  if (user.awards.lastLogin?.toDateString() !== now.toDateString()) addKarma(user, 50);
  user.awards.lastLogin = now;
  await user.save();

  const token = jwt.sign({ uid: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.cookie('token', token, { ...cookieOptions, maxAge: DAY });
  res.send({ status: 'success' });
};

export const logout = (req, res) => {
  res.clearCookie('token', cookieOptions);
  res.send({ status: 'success' });
};
