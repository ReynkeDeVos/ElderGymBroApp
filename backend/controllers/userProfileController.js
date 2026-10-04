import User from '../models/userSchema.js';
import ErrorResponse from '../utils/ErrorResponse.js';
import { getDefaultAvatar } from '../utils/profileUtils.js';
import { uploadAvatar } from '../services/Upload.js';

export const getUser = (req, res) => res.json(req.user);

export const updateGender = async (req, res) => {
  req.user.gender = req.body.gender;
  req.user.avatar = getDefaultAvatar(req.body.gender);
  await req.user.save();
  res.json({ message: 'Successfully changed gender and updated avatar' });
};

export const updateFitnessLevel = async (req, res) => {
  req.user.fitnessLevel = req.body.fitnessLevel;
  await req.user.save();
  res.json({ message: 'Successfully changed fitness level' });
};

export const updateWorkoutAim = async (req, res) => {
  req.user.workoutAim = req.body.workoutAim;
  await req.user.save();
  res.json({ message: 'Successfully changed workout aim' });
};

export const updateAvatar = async (req, res) => {
  if (!req.file) throw new ErrorResponse('No avatar file uploaded', 400);
  req.user.avatar = await uploadAvatar(req.file);
  await req.user.save();
  res.json({ avatar: req.user.avatar, message: 'Successfully changed avatar link' });
};

export const updateProfile = async (req, res) => {
  const { user } = req;
  const { fullName, username, age, weight, gender } = req.body;
  if (username !== user.username && (await User.exists({ username }))) {
    throw new ErrorResponse('Username already exists', 409);
  }
  // Keep an uploaded avatar unless the gender (and so the default avatar) changes
  if (gender !== user.gender) user.avatar = getDefaultAvatar(gender);
  Object.assign(user, { fullName, username, age, weight, gender });
  await user.save();
  res.json({ message: 'Successfully updated profile' });
};
