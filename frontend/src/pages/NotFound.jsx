import { useNavigate } from 'react-router';
import NotFoundImage from '../assets/images/404.avif';
import Shoggoth from '../assets/images/workouts/shoggoth.webp';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-svh bg-black text-gray-200">
      <button onClick={() => navigate('/')} className="m-2 font-semibold text-teal-600">
        Home
      </button>
      <div className="flex flex-row justify-center">
        <h1 className="font-cthulhumbus bg-linear-to-br from-white to-gray-400 bg-clip-text p-2 text-center text-4xl leading-tight font-medium text-transparent sm:text-3xl md:text-4xl">
          404 - Not Found
        </h1>
      </div>
      <div className="flex flex-row justify-center">
        <img src={NotFoundImage} alt="404 not found" />
      </div>
      <div className="flex flex-row justify-center">
        <button
          onClick={() => navigate('/home')}
          className="mt-2 rounded-full border border-white bg-pink-900 px-4 py-2 text-white transition-transform hover:scale-110">
          Go Back
        </button>
      </div>
      <div className="font-cthulhumbus flex flex-col items-center bg-linear-to-br from-white to-gray-400 bg-clip-text p-2 text-center leading-tight font-medium text-transparent sm:text-3xl md:text-4xl">
        <p>or be digested by Shoggoth</p>
        <img src={Shoggoth} alt="404 not found" className="-mt-11 scale-75" />
      </div>
    </div>
  );
}

export default NotFound;
