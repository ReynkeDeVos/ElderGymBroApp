import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { api } from '../../utils/api';
import { Box, Button, Modal, Typography } from '@mui/material';
import setgrind from '../../assets/images/setgrind.jpeg';
import beginner from '../../assets/images/beginner.jpeg';
import intermediate from '../../assets/images/intermediate.jpeg';
import advanced from '../../assets/images/advanced.jpeg';
import { BackLink, OnboardingSteps } from '../../assets/components/Navigation';

const cards = [
  { name: 'Beginner', level: 'beginner', image: beginner, perWeek: '3×', motto: 'Strengthening tributes' },
  {
    name: 'Intermediate',
    level: 'intermediate',
    image: intermediate,
    perWeek: '4-5×',
    motto: 'A ritual of unleashing',
  },
  { name: 'Advanced', level: 'advanced', image: advanced, perWeek: '5-6×', motto: 'Echoes of my power in your veins!' },
];

const buttonSx = { color: 'white', mt: 1, textTransform: 'none' };

function SetYourGrind() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const handleChoose = async () => {
    try {
      await api('/profile/me/fitnessLevel', { method: 'PATCH', body: { fitnessLevel: selected.level } });
      navigate('/whatsyourgoal');
    } catch {
      toast.error('Could not save your level');
    }
  };

  return (
    <div className="min-h-svh bg-linear-to-br from-black to-blue-950 text-gray-200">
      <BackLink to="/startyourjourney" />
      <div className="flex flex-row justify-center">
        <h2 className="font-cthulhumbus bg-linear-to-br from-white to-gray-400 bg-clip-text p-2 text-center text-2xl/tight font-medium text-transparent sm:text-3xl/9 md:text-4xl/10">
          Set Your Grind
        </h2>
      </div>

      <img src={setgrind} alt="Set Your Grind" className="rounded-lg" />

      <div className="grid grid-cols-1 gap-3 p-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.name}
            className="mx-auto max-w-xs transform cursor-pointer overflow-hidden rounded-sm border-teal-800 bg-linear-to-tr from-gray-900 via-pink-900 to-zinc-900 object-cover text-gray-800 shadow-lg transition duration-500 hover:scale-105"
            onClick={() => setSelected(card)}>
            <img className="h-36 w-96 object-cover" src={card.image} alt={card.name} />
            <div className="px-6 py-2 text-center">
              <div className="font-cthulhumbus text-lg font-bold text-teal-500">{card.name}</div>
            </div>
          </div>
        ))}
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: 600,
            bgcolor: 'darkslategray',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)',
            p: 1.5,
            borderRadius: '20px',
          }}
          className="bg-linear-to-tr from-gray-900 via-pink-900 to-zinc-900 text-gray-800 shadow-lg">
          {selected && (
            <>
              <Typography
                variant="h6"
                component="h2"
                sx={{
                  fontFamily: 'var(--font-cthulhumbus)',
                  fontSize: '3rem',
                  fontWeight: 'bold',
                  color: '#81E6D9',
                  textAlign: 'center',
                }}>
                {selected.name}
              </Typography>
              <img
                src={selected.image}
                alt={selected.name}
                style={{ width: '100%', maxHeight: '15rem', objectFit: 'cover', borderRadius: '5px' }}
              />
              <Typography
                sx={{ mt: 2, fontSize: '1.125rem', fontWeight: 'bold', color: '#ffffff', textAlign: 'center' }}>
                {selected.perWeek} trainings a week:
                <br />
                {selected.motto}
              </Typography>
              <div className="mt-2 flex justify-between">
                <Button
                  variant="contained"
                  onClick={() => setSelected(null)}
                  sx={{
                    ...buttonSx,
                    backgroundColor: '#2D3748',
                    px: '8px',
                    '&:hover': { backgroundColor: '#4A5568' },
                  }}>
                  Close
                </Button>
                <Button
                  variant="contained"
                  onClick={handleChoose}
                  sx={{ ...buttonSx, backgroundColor: '#38B2AC', '&:hover': { backgroundColor: '#319795' } }}>
                  I&apos;m in!
                </Button>
              </div>
            </>
          )}
        </Box>
      </Modal>

      <div className="mt-4 flex flex-col pb-4">
        <OnboardingSteps />
      </div>
    </div>
  );
}

export default SetYourGrind;
