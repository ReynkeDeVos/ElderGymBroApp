import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import hardcodedWorkouts from './data/hardcodedWorkouts.json' with { type: 'json' };
import { errorHandler } from './middleware/ErrorHandler.js';
import verifyToken from './middleware/verifyToken.js';
import upload from './services/Upload.js';
import * as auth from './controllers/auth.js';
import * as profile from './controllers/userProfileController.js';
import * as tracking from './controllers/userWorkoutTrackingController.js';

await mongoose.connect(process.env.mongoDBURI);

const app = express();

app.use(express.json());
app.use(cors({ origin: ['https://localhost:5173', 'https://eldergymbro.netlify.app'], credentials: true }));
app.use(cookieParser());

app.post('/auth/register', auth.signUp);
app.post('/auth/login', auth.signIn);
app.post('/auth/logout', auth.logout);

app.get('/profile/me', verifyToken, profile.getUser);
app.patch('/profile/me/gender', verifyToken, profile.updateGender);
app.patch('/profile/me/fitnessLevel', verifyToken, profile.updateFitnessLevel);
app.patch('/profile/me/workoutAim', verifyToken, profile.updateWorkoutAim);
app.patch('/profile/me/avatar', verifyToken, upload.single('avatar'), profile.updateAvatar);
app.patch('/profile/me/profileupdate', verifyToken, profile.updateProfile);

app.patch('/me/workouttracking/setActiveWorkout', verifyToken, tracking.setUserActiveWorkout);
app.post('/me/workouttracking/addWorkoutProgress', verifyToken, tracking.addWorkoutProgress);
app.post('/me/workouttracking/addExerciseProgress/:workoutId', verifyToken, tracking.addExerciseProgress);

app.get('/hardcodedworkouts', (req, res) => res.json(hardcodedWorkouts));

app.use(errorHandler);

app.listen(process.env.PORT || 8000);
