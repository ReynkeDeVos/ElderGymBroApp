import ErrorResponse from '../utils/ErrorResponse.js';
import { addKarma } from '../utils/karmaUtils.js';

const EXERCISE_KARMA = 10;

export const setUserActiveWorkout = async (req, res) => {
  req.user.activeWorkoutId = req.body.workoutId;
  await req.user.save();
  res.json({ message: 'Active workout set successfully' });
};

// Starts tracking a workout; idempotent so "Start Workout" works every day.
export const addWorkoutProgress = async (req, res) => {
  const workoutId = Number(req.body.workoutId);
  const { user } = req;
  user.activeWorkoutId = workoutId;
  if (!user.progressTracking.some((entry) => entry.workoutId === workoutId)) {
    user.progressTracking.push({ workoutId });
  }
  await user.save();
  res.json({ message: 'Workout progress added successfully' });
};

export const addExerciseProgress = async (req, res) => {
  const { exerciseId, exerciseName, sets } = req.body;
  const { user } = req;

  const tracking = user.progressTracking.find((entry) => entry.workoutId === Number(req.params.workoutId));
  if (!tracking) throw new ErrorResponse('Workout progress not found', 404);

  const today = new Date().toDateString();
  let day = tracking.progress.find((entry) => entry.day.toDateString() === today);
  if (!day) {
    tracking.progress.push({});
    day = tracking.progress.at(-1);
  }
  day.exercisesOfTheDay.push({ exerciseId, exerciseName, sets });
  addKarma(user, EXERCISE_KARMA);

  await user.save();
  res.json({ message: 'Exercise progress added successfully', karma: EXERCISE_KARMA });
};
