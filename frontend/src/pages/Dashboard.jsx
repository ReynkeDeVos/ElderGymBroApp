import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthProvider';
import { api } from '../utils/api';
import Carousel from '../assets/components/Carousel';
import { workoutImage } from '../utils/images';
import firstLoginImage from '../assets/images/firstlogin.jpeg';
import firstPlanCreatedImage from '../assets/images/firstplancreated.jpeg';
import weekendWorkoutImage from '../assets/images/weekendworkout.jpeg';

const otherCultists = [
  { image: firstLoginImage, heading: 'Mike', subheading: 'First Incantation of Fitness' },
  { image: firstPlanCreatedImage, heading: 'Malte', subheading: 'First Incantation of Fitness' },
  { image: weekendWorkoutImage, heading: 'Walter', subheading: 'Weekend Workout Cultist' },
];

const today = () => new Date().toISOString().slice(0, 10);

const Dashboard = ({ workouts }) => {
  const { userData, setUserData, checkUser } = useAuth();
  const navigate = useNavigate();
  // Local pick wins over userData, which the refresh below may overwrite with an older value
  const [pickedId, setPickedId] = useState(null);

  // Pick up karma and progress earned since the last visit
  useEffect(() => {
    checkUser();
  }, [checkUser]);

  const selectedIndex = Math.max(
    0,
    workouts.findIndex((w) => w.id === (pickedId ?? Number(userData.activeWorkoutId))),
  );
  const activeWorkout = workouts[selectedIndex];
  const doneToday =
    userData.progressTracking
      ?.find((t) => t.workoutId === activeWorkout?.id)
      ?.progress.find((d) => d.day.slice(0, 10) === today())?.exercisesOfTheDay.length ?? 0;
  const workoutCompleted = activeWorkout && doneToday >= activeWorkout.exercises.length;

  const selectWorkout = async (index) => {
    const workoutId = workouts[index].id;
    setPickedId(workoutId);
    setUserData((user) => ({ ...user, activeWorkoutId: String(workoutId) }));
    try {
      await api('/me/workouttracking/setActiveWorkout', { method: 'PATCH', body: { workoutId } });
    } catch {
      toast.error('Could not save your workout choice');
    }
  };

  const startWorkout = async () => {
    try {
      await api('/me/workouttracking/addWorkoutProgress', { method: 'POST', body: { workoutId: activeWorkout.id } });
      navigate('/userworkout');
    } catch {
      toast.error('Could not start the workout');
    }
  };

  return (
    <div className="container mx-auto flex min-h-screen flex-col bg-linear-to-br from-black to-blue-950 p-4 pb-24 text-white">
      <div className="mt-16 flex flex-col items-center justify-center">
        <h2 className="font-cthulhumbus cursor-default bg-linear-to-br from-white to-gray-400 bg-clip-text pt-2 text-center text-3xl/tight font-medium text-transparent md:pt-8 md:text-4xl/10">
          Welcome Dear <br /> {userData.fullName}!
        </h2>
        <hr className="my-4 w-full border-gray-500 opacity-50" />

        <div className="font-cthulhumbus flex w-full flex-col items-center px-4 pb-2">
          <div className="mt-0 w-full max-w-screen-sm">
            <h2 className="font-cthulhumbus bg-linear-to-br from-white to-gray-400 bg-clip-text px-4 py-2 pt-2 text-center text-3xl/tight font-medium text-transparent md:text-4xl/10">
              Choose your workout:
            </h2>
            <div className="pb-6">
              {activeWorkout ? (
                <Carousel
                  className="max-w-full"
                  initialSlide={selectedIndex}
                  beforeChange={(_, next) => selectWorkout(next)}>
                  {workouts.map((workout) => (
                    <div key={workout.id} className="carousel-item flex flex-col items-center px-2">
                      <img src={workoutImage(workout.name)} alt={workout.name} className="rounded-t-lg shadow-lg" />
                      <p className="mt-2 text-center text-xs text-white">{workout.name}</p>
                    </div>
                  ))}
                </Carousel>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </div>

        {activeWorkout &&
          (workoutCompleted ? (
            <div className="font-cthulhumbus mb-2 w-4/5 rounded-md border-2 border-pink-800 bg-linear-to-tr from-gray-900 via-pink-900 to-zinc-900 p-4 text-center text-2xl">
              <span className="text-xl">Your workout for the day is complete!</span> <br />
              <span>Cthulhu is pleased!</span>
            </div>
          ) : (
            <button
              className="rounded-md border-2 border-pink-800 bg-linear-to-tr from-gray-900 via-pink-900 to-zinc-900 p-3 text-center"
              onClick={startWorkout}>
              Start Workout
            </button>
          ))}

        <div className="mt-8 w-full">
          <hr className="my-4 w-full border-gray-500 opacity-50" />
          <h2 className="font-cthulhumbus cursor-default bg-linear-to-br from-white to-gray-400 bg-clip-text text-center text-3xl/tight font-medium text-transparent md:text-4xl/10">
            Other Cultists&apos; Achievements
          </h2>
        </div>

        <div className="mt-4 w-full px-4">
          <Carousel centerPadding="30%">
            {otherCultists.map((card) => (
              <div key={card.heading} className="carousel-item">
                <img src={card.image} alt={card.heading} className="mx-auto rounded-lg" />
                <h3 className="text-center text-xl font-medium">{card.heading}</h3>
                <p className="text-center text-sm">{card.subheading}</p>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
