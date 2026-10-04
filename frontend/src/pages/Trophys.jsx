import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Box, IconButton, LinearProgress, Modal, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import trophyIcon from '../assets/icons/trophy.svg';
import cuteCthulhu from '../assets/images/cuteCthulhu.avif';
import firstWorkoutDone from '../assets/images/firstworkoutdone.avif';
import trainingNight from '../assets/images/trainingnight.avif';
import chestDay from '../assets/images/Chest1.avif';
import weekendWorkout from '../assets/images/weekendworkout.avif';
import firstPlanCreated from '../assets/images/firstplancreated.avif';
import firstLogin from '../assets/images/firstlogin.avif';

const achievements = [
  { id: 1, name: 'Call of Cthulhu', imageUrl: firstLogin, requirements: 'Log into ELDERGYMBRO for the first time' },
  {
    id: 2,
    name: 'Joined the Cult!',
    imageUrl: firstWorkoutDone,
    requirements: 'Finished a workout plan from another Cultist.',
  },
  { id: 3, name: 'Training at night', imageUrl: trainingNight, requirements: 'Start a workout between 10 pm and 2 am' },
  { id: 4, name: 'Chestday', imageUrl: chestDay, requirements: 'Chest workout on Mondays' },
  {
    id: 5,
    name: 'Weekend Workout Cultist',
    imageUrl: weekendWorkout,
    requirements: 'Finish your Workout on Saturday/Sunday',
  },
  {
    id: 6,
    name: 'First Incantation of Fitness',
    imageUrl: firstPlanCreated,
    requirements: 'Create your first personalized workout plan',
  },
  { id: 7, name: 'Beginner Gains', imageUrl: cuteCthulhu, requirements: 'First Workout completed' },
];

// Unlocked achievement ids
const unlocked = [1, 6];
const progress = (unlocked.length / achievements.length) * 100;
let announced = false; // toast the unlocks once per page load

const Trophys = () => {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (announced) return;
    announced = true;
    achievements.filter((a) => unlocked.includes(a.id)).forEach((a) => toast.success(`🏆 ${a.name}`));
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-black to-blue-950 pt-20">
      <div className="flex flex-row justify-center">
        <h2 className="font-cthulhumbus cursor-default bg-linear-to-br from-white to-gray-400 bg-clip-text py-2 text-center text-3xl/tight font-medium text-transparent sm:py-4 md:pt-8 md:text-4xl/10">
          Trophies
        </h2>
      </div>
      <div className="flex justify-center">
        <img src={trophyIcon} alt="" width="150" height="150" />
      </div>

      <div className="container mx-auto flex flex-col items-center">
        <Box sx={{ width: '80%', mt: 1 }}>
          <LinearProgress variant="determinate" color="warning" value={progress} sx={{ height: 8, borderRadius: 5 }} />
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
            <Typography variant="body2" color="textSecondary">{`${Math.round(progress)}% of all Trophies`}</Typography>
          </Box>
        </Box>
      </div>

      <div className="mt-8 mb-16 grid grid-cols-2 gap-4">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className="flex cursor-pointer flex-col items-center"
            onClick={() => setSelected(achievement)}>
            <img
              src={achievement.imageUrl}
              alt={achievement.name}
              className={`mb-2 size-32 rounded-full ring-4 ring-pink-800 ring-offset-teal-800 ${unlocked.includes(achievement.id) ? '' : 'opacity-30 ring-gray-700'}`}
            />
            <span className="font-cthulhumbus text-center text-sm">{achievement.name}</span>
          </div>
        ))}
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} className="flex size-full items-end justify-center">
        <Box
          sx={{
            px: 4,
            py: 2,
            bgcolor: 'background.paper',
            borderRadius: '16px 16px 0 0',
            boxShadow: '0 -4px 6px rgba(0, 0, 0, 0.1)',
            position: 'fixed',
            bottom: 0,
            width: '100vw',
            maxWidth: '500px',
          }}
          className="mx-auto space-y-5">
          {selected && (
            <>
              <div className="font-cthulhumbus text-2xl">{selected.name}</div>
              <IconButton
                aria-label="close"
                onClick={() => setSelected(null)}
                sx={{ position: 'absolute', right: 8, top: -6 }}>
                <CloseIcon />
              </IconButton>
              <div className="mt-2 text-teal-500">{selected.requirements}</div>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Trophys;
