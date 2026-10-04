import mongoose from 'mongoose';
import { getTitle } from '../utils/karmaUtils.js';
import { getDefaultAvatar } from '../utils/profileUtils.js';

const { Schema } = mongoose;

const exerciseTrackingSchema = new Schema({
  exerciseId: { type: Number, default: 0 },
  exerciseName: { type: String, default: '' },
  sets: [{ reps: { type: Number, required: true }, weight: { type: Number, required: true } }],
  date: { type: Date, default: Date.now },
});

const workoutTrackingSchema = new Schema({
  workoutId: Number,
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, default: null },
  progress: [{ day: { type: Date, default: Date.now }, exercisesOfTheDay: [exerciseTrackingSchema] }],
});

const userSchema = new Schema(
  {
    fullName: { type: String, default: 'Cultist' },
    username: { type: String, required: [true, 'Username is required'] },
    email: { type: String, unique: true, required: [true, 'Email is required'] },
    password: { type: String, required: [true, 'Password is required'], select: false },
    age: { type: Number, default: null },
    weight: { type: Number, default: null },
    gender: { type: String, default: '', enum: ['', 'male', 'female', 'elder thing', 'blob', 'other'] },
    fitnessLevel: { type: String, default: '', enum: ['', 'beginner', 'intermediate', 'advanced'] },
    workoutAim: {
      type: String,
      default: '',
      enum: [
        '',
        'Grow Your Muscles',
        'Build Your Stamina',
        'Maximize Your Strength',
        'Cardio Crusade',
        'Achieve Weight Loss',
      ],
    },
    avatar: {
      type: String,
      default() {
        return getDefaultAvatar(this.gender);
      },
    },
    // Gamification
    awards: {
      level: { type: Number, default: 1 },
      progress: { type: Number, default: 0 },
      karmaPoints: { type: Number, default: 0 },
      title: {
        type: String,
        default() {
          return getTitle(this.awards.karmaPoints);
        },
      },
      lastLogin: { type: Date, default: null },
    },
    progressTracking: { type: [workoutTrackingSchema], default: [] },
    activeWorkoutId: { type: String, default: '2' },
  },
  { timestamps: true },
);

export default mongoose.model('User', userSchema);
