import { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Confetti from 'react-confetti';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthProvider';
import Carousel from '../assets/components/Carousel';
import UserActiveExercise from './UserActiveExercise';
import { exerciseImage } from '../utils/images';
import doneImage from '../assets/images/finished.png';

const UserWorkout = ({ workouts }) => {
  const { userData } = useAuth();
  const navigate = useNavigate();
  const sliderRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [completed, setCompleted] = useState([]); // indices of finished or skipped exercises
  const [karmaPoints, setKarmaPoints] = useState(0);

  const activeWorkout = workouts.find((w) => w.id === Number(userData.activeWorkoutId));
  if (!activeWorkout) return <div>Loading...</div>;

  const { exercises } = activeWorkout;
  const exercise = exercises[selectedIndex];
  const allDone = exercises.every((_, i) => completed.includes(i));

  // Mark the current exercise done and move on to the next one
  const finishExercise = () => {
    if (!completed.includes(selectedIndex)) setCompleted([...completed, selectedIndex]);
    if (selectedIndex < exercises.length - 1) {
      sliderRef.current.slickGoTo(selectedIndex + 1);
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const completeExercise = async (sets) => {
    try {
      const { data } = await axios.post(`/me/workouttracking/addExerciseProgress/${activeWorkout.id}`, {
        exerciseId: exercise.id,
        exerciseName: exercise.name,
        sets,
      });
      setKarmaPoints(karmaPoints + data.karma);
      toast.success(`✨ ${data.karma} dark blessings received!`, { autoClose: 2000 });
      finishExercise();
    } catch (error) {
      console.error(error);
      toast.error('Could not save this exercise');
    }
  };

  return (
    <div className="font-cthulhumbus flex min-h-screen flex-col items-center bg-linear-to-br from-black to-blue-950 pt-0">
      <div className="fixed top-0 right-0 left-0 z-50 mx-auto max-w-2xl bg-black p-0 text-center text-white shadow-md">
        <div className="flex items-center justify-center">
          <span className="mr-2">Karma</span>
          <progress className="progress progress-accent w-56" value={karmaPoints} max="100"></progress>
          <span className="ml-2">+ {karmaPoints} pts</span>
        </div>
      </div>
      <div className="mt-6 w-full max-w-screen-sm">
        <h2 className="font-cthulhumbus px-4 py-2 text-center text-xl text-white">Exercise List</h2>
        <div className="pb-6">
          <Carousel className="max-w-full" ref={sliderRef} afterChange={setSelectedIndex}>
            {exercises.map((ex, index) => (
              <div key={ex.id} className="carousel-item flex flex-col items-center px-2">
                <img
                  src={exerciseImage(ex.name)}
                  alt={ex.name}
                  className={`h-auto w-full max-w-xs rounded-md ${completed.includes(index) ? 'grayscale' : ''}`}
                />
                <p className="mt-2 text-center text-xs text-white">{ex.name}</p>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
      <UserActiveExercise
        key={exercise.id}
        exercise={exercise}
        isCompleted={completed.includes(selectedIndex)}
        onComplete={completeExercise}
        onSkip={finishExercise}
      />
      {allDone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75">
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            numberOfPieces={1000}
            recycle={false}
            className="absolute inset-0"
          />
          <div className="relative z-10 w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
            <h2 className="text-center text-2xl font-bold text-green-500">Well done!</h2>
            <p className="mt-4 text-center text-green-500">You have completed all exercises.</p>
            <p className="pb-4 text-center text-green-500">Total Karma Points Collected: {karmaPoints}</p>
            <img src={doneImage} alt="Well done" className="mx-auto mb-4 h-32 w-32" />
            <button className="mt-6 w-full rounded-md bg-green-500 py-2 text-white" onClick={() => navigate('/home')}>
              Completed
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserWorkout;
