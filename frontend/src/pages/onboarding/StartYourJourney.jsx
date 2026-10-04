import { Link } from 'react-router';
import Button from '@mui/material/Button';
import startJourney from '../../assets/images/startjourney.jpeg';
import { BackLink, OnboardingSteps } from '../../assets/components/Navigation';

function StartYourJourney() {
  return (
    <div className="relative min-h-svh bg-linear-to-br from-black to-blue-950 text-gray-200">
      <BackLink to="/login" />
      <div className="flex flex-row justify-center">
        <h1 className="font-cthulhumbus bg-linear-to-br from-white to-gray-400 bg-clip-text p-2 text-center text-2xl/tight font-medium text-transparent sm:text-3xl/9 md:text-4xl/10">
          Start Your Journey
        </h1>
      </div>

      <img src={startJourney} alt="start-your-journey" className="h-[28svh] w-full rounded-lg object-cover" />

      <div
        className="mt-4 flex flex-wrap justify-center rounded-lg bg-[#0a3d62] p-4 text-white shadow-lg"
        style={{ fontFamily: 'Papyrus, fantasy' }}>
        <p className="text-center text-xl">
          Before you embark on this journey, we must first delve into the depths of your mortal shell with 3 quick
          questions.
          <br /> <br />
          Prepare yourself, for the ancient ones are watching!
        </p>
      </div>

      <div className="absolute inset-x-0 bottom-4">
        <div className="flex flex-col">
          <OnboardingSteps />
        </div>
        <div className="mt-2 flex justify-center">
          <Button
            variant="contained"
            component={Link}
            to="/setyourgrind"
            sx={{ mt: 1, mb: 2, backgroundColor: 'teal', color: 'white' }}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default StartYourJourney;
