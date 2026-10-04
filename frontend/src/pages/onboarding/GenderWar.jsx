import { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { Box, Modal } from '@mui/material';
import maleImage from '../../assets/images/gender/male.jpeg';
import femaleImage from '../../assets/images/gender/female.jpg';
import eldritchHorrorImage from '../../assets/images/gender/horror.jpeg';
import blobImage from '../../assets/images/gender/blob.jpg';
import otherImage from '../../assets/images/gender/other.jpg';
import { BackLink, OnboardingSteps } from '../../assets/components/Navigation';

const genders = [
  { name: 'Male', value: 'male', image: maleImage, mundane: true },
  { name: 'Female', value: 'female', image: femaleImage, mundane: true },
  { name: 'Eldritch', value: 'elder thing', image: eldritchHorrorImage },
  { name: 'Blob', value: 'blob', image: blobImage },
  { name: 'Other', value: 'other', image: otherImage },
];

const mundaneMessages = [
  'The elder gods do not approve of your boring choice',
  'The elder gods sigh, their interest waning at your ordinary choice',
  'The void whispers, ‘Is that all you can muster?’',
  'The stars align, only to reveal their disappointment in your common selection',
  'The ancient ones stir in their slumber, unimpressed by your mundane choice',
  'The abyss gazes back, indifferent to your conventional selection',
  'The cosmic horrors yawn at your predictable decision',
];

const approvedMessages = [
  'The ancient ones murmur in approval, their dark whispers echoing through the void',
  'The stars align, casting an eerie glow of satisfaction upon your choice',
  'The cosmic horrors nod in silent agreement, their approval palpable',
  'The void hums with a sinister delight, acknowledging your decision',
  'The elder gods smile, their approval resonating through the fabric of reality',
  'The abyss stirs, pleased with the path you have chosen',
  'The eldritch forces converge, their approval a dark blessing upon your choice',
];

const pick = (list) => list[Math.floor(Math.random() * list.length)];

const GenderWar = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null); // { ...gender, message }

  const close = () => setSelected(null);

  const choose = async () => {
    try {
      await axios.patch('/profile/me/gender', { gender: selected.value });
      navigate('/setup');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-svh bg-linear-to-br from-black to-blue-950 text-gray-200">
      <BackLink to="/whatsyourgoal" />
      <div className="flex flex-row justify-center">
        <h2 className="font-cthulhumbus bg-linear-to-br from-white to-gray-400 bg-clip-text p-2 text-center text-2xl leading-tight font-medium text-transparent sm:text-3xl/9 md:text-4xl/10">
          Choose your gender
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3 p-5 lg:grid-cols-3">
        {genders.map((gender) => (
          <div
            key={gender.name}
            className="mx-auto max-w-xs transform cursor-pointer overflow-hidden rounded-sm border-teal-800 bg-linear-to-tr from-gray-900 via-pink-900 to-zinc-900 object-cover text-gray-800 shadow-lg transition duration-500 hover:scale-105"
            onClick={() =>
              setSelected({ ...gender, message: pick(gender.mundane ? mundaneMessages : approvedMessages) })
            }>
            <img className="w-full" src={gender.image} alt={gender.name} />
            <div className="px-6 py-2 text-center">
              <div className="font-cthulhumbus text-lg font-bold text-teal-500">{gender.name}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-1 pb-6">
        <div className="flex flex-col">
          <OnboardingSteps />
        </div>
      </div>

      <Modal open={!!selected} onClose={close}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
          className="mx-auto max-w-lg">
          {selected && (
            <div className="cursor-pointer overflow-hidden rounded-sm border-teal-800 bg-linear-to-tr from-gray-900 via-pink-900 to-zinc-900 object-cover text-gray-800 shadow-lg">
              <div className="px-6 py-2 text-center">
                <div className="font-cthulhumbus text-lg font-bold text-teal-500">{selected.message}</div>
              </div>
              <img className={selected.mundane ? 'grayscale' : ''} src={selected.image} alt={selected.name} />
              <div className="px-6 py-2 text-center">
                <div
                  className={`font-cthulhumbus text-lg font-bold text-teal-500 ${selected.mundane ? 'grayscale' : ''}`}>
                  {selected.name}
                </div>
                <div className="mt-2 flex justify-between">
                  <button className="rounded-sm bg-gray-800 px-2 text-white hover:bg-gray-700" onClick={close}>
                    Close
                  </button>
                  {selected.mundane ? (
                    <button
                      className="rounded-sm bg-red-500 px-4 py-2 font-semibold text-white transition duration-300 hover:bg-red-600"
                      onClick={close}>
                      Denied
                    </button>
                  ) : (
                    <button
                      onClick={choose}
                      className="rounded-sm bg-teal-500 px-4 py-2 font-semibold text-white transition duration-300 hover:bg-teal-600">
                      This is me
                    </button>
                  )}
                </div>
                {selected.mundane && <div className="mt-2 text-red-500">No mundane choices allowed</div>}
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default GenderWar;
