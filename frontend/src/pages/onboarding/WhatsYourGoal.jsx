import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { api } from '../../utils/api';
import growMuscleImage from '../../assets/images/growmuscle.avif';
import buildStaminaImage from '../../assets/images/buildupyourstamina.avif';
import maximizeStrengthImage from '../../assets/images/maximizeyourstrength.avif';
import weightGainImage from '../../assets/images/weightgain.avif';
import { BackLink, OnboardingSteps } from '../../assets/components/Navigation';

// heading doubles as the workoutAim value stored on the server
const cards = [
  { image: growMuscleImage, heading: 'Grow Your Muscles', subheading: '8 - 15 Reps' },
  { image: buildStaminaImage, heading: 'Build Your Stamina', subheading: '15 - 20+ Reps' },
  { image: maximizeStrengthImage, heading: 'Maximize Your Strength', subheading: '4 - 10 Reps' },
  { image: weightGainImage, heading: 'Achieve Weight Loss', subheading: '15 - 30+ Reps' },
];

function WhatsYourGoal() {
  const [activeCard, setActiveCard] = useState(null);
  const navigate = useNavigate();

  const chooseAim = async () => {
    try {
      await api('/profile/me/workoutAim', { method: 'PATCH', body: { workoutAim: activeCard.heading } });
      navigate('/gender');
    } catch {
      toast.error('Could not save your goal');
    }
  };

  return (
    <div className="min-h-svh bg-linear-to-br from-black to-blue-950 text-gray-200">
      <BackLink to="/setyourgrind" />
      <div className="flex flex-row justify-center">
        <h1 className="font-cthulhumbus bg-linear-to-br from-white to-gray-400 bg-clip-text p-2 text-center text-2xl/tight font-medium text-transparent sm:text-3xl/9 md:text-4xl/10">
          What&apos;s your goal
        </h1>
      </div>

      <div className="flex flex-wrap justify-center">
        <div className="grid grid-flow-row auto-rows-max grid-cols-2 gap-2 p-2">
          {cards.map((card) => (
            <div key={card.heading} className="m-1 h-full cursor-pointer" onClick={() => setActiveCard(card)}>
              <div className="h-auto transform rounded-t-lg border-4 border-solid border-teal-800 bg-linear-to-tr from-gray-900 via-pink-900 to-zinc-900 object-cover transition-transform duration-300 ease-in-out hover:scale-110">
                <img src={card.image} alt={card.heading} className="h-80 w-56 rounded-sm object-cover object-top" />
                <div className="flex h-auto grow flex-col items-center border-2 border-solid border-pink-800 p-2 text-white">
                  <p className="font-cthulhumbus text-center text-xl text-teal-500">{card.subheading}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeCard && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black/40"
          onClick={() => setActiveCard(null)}>
          <div
            className="flex max-w-xs flex-col rounded-lg bg-linear-to-tr from-gray-900 via-pink-900 to-zinc-900 object-cover p-4 text-gray-800 shadow-lg"
            onClick={(e) => e.stopPropagation()}>
            <img
              src={activeCard.image}
              alt={activeCard.heading}
              className="h-96 w-auto rounded-lg object-cover object-top"
            />
            <div className="mt-4">
              <h3 className="font-cthulhumbus text-center text-2xl font-bold text-teal-500">{activeCard.heading}</h3>
              <p className="font-cthulhumbus text-center text-base font-bold text-teal-500">
                {activeCard.subheading} = repetitions
              </p>
            </div>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setActiveCard(null)}
                className="rounded-sm bg-gray-800 px-4 py-2 text-white hover:bg-gray-700">
                Close
              </button>
              <button onClick={chooseAim} className="rounded-sm bg-teal-500 px-4 py-2 text-white hover:bg-teal-600">
                Choose this
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col py-2">
        <OnboardingSteps />
      </div>
    </div>
  );
}

export default WhatsYourGoal;
