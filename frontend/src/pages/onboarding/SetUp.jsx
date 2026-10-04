import { useNavigate } from 'react-router';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import setUp from '../../assets/images/startYourJourney.avif';
import { useAuth } from '../../context/AuthProvider';
import { BackLink, OnboardingSteps } from '../../assets/components/Navigation';

function SetUp() {
  const navigate = useNavigate();
  const { checkUser } = useAuth();

  const handleStartClick = async () => {
    const { gender, fitnessLevel, workoutAim } = await checkUser();
    if (gender && fitnessLevel && workoutAim) {
      toast.success('🎉 All set up. Happy grinding.');
      navigate('/home');
    } else {
      toast.info('🚀 Answer all questions');
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-tr from-gray-900 via-pink-900 to-zinc-900 text-teal-500">
      <BackLink to="/gender" className="bg-gray-950" />
      <img src={setUp} alt="Start Your Journey" className="h-[45svh] w-full object-cover" />
      <p className="mt-4 text-center text-4xl font-semibold text-teal-400">
        Consistency is <br /> the key to progress.
        <br /> Don&apos;t give up!
      </p>
      <div className="mt-4 bg-teal-800 p-4">
        <p className="font-cthulhumbus text-center text-sm/7 tracking-wide text-slate-300">
          &quot;Embrace the struggle, for true power awakens in perseverance. The void rewards the relentless!&quot;
        </p>
      </div>

      <div className="mt-6 flex flex-col">
        <OnboardingSteps />
      </div>

      <div className="-mt-4 flex justify-center">
        <Button
          variant="contained"
          onClick={handleStartClick}
          sx={{ mt: 4, mb: 2, backgroundColor: 'teal', color: 'white' }}>
          Start
        </Button>
      </div>
    </div>
  );
}

export default SetUp;
