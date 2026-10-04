import { CircularProgressbar } from 'react-circular-progressbar';
import { useAuth } from '../../context/AuthProvider';
import logoImage from '../icons/elderGymBroLogo.png';

const progressStyles = {
  root: { width: '100%' },
  path: { stroke: '#9d174d', strokeLinecap: 'round', transition: 'stroke-dashoffset 0.5s ease 0s' },
  trail: { stroke: '#14b8a6' },
  text: { fill: '#3e98c7', fontSize: 45, dominantBaseline: 'middle', textAnchor: 'middle' },
};

const UserBar = () => {
  const { userData, isLoggedIn } = useAuth();

  return (
    <nav className="font-cthulhumbus fixed inset-x-0 top-0 z-50 mx-auto flex w-full max-w-2xl cursor-default items-center justify-between bg-gray-900 py-2 shadow-md select-none">
      <div className="grid w-full grid-cols-3">
        <div className="flex items-center">
          <img src={logoImage} alt="App Logo" className="mx-auto ml-5 w-10 sm:w-12 md:mx-auto md:w-24" />
        </div>
        {isLoggedIn ? (
          <div className="flex flex-col items-center justify-center">
            <div className="font-cthulhumbus mt-1 cursor-default bg-linear-to-br from-teal-500 to-green-800 bg-clip-text text-center text-xl/tight font-medium text-transparent sm:text-2xl/8 md:text-3xl/9">
              {userData.username || 'No username'}
            </div>
            <div className="font-cthulhumbus cursor-default bg-linear-to-br from-yellow-950 to-yellow-500 bg-clip-text text-center text-xl/tight font-medium text-nowrap text-transparent sm:text-2xl/8 md:text-3xl/9">
              {userData.awards?.title || 'No title'}
            </div>
          </div>
        ) : (
          <p className="text-center text-teal-700">Loading...</p>
        )}
        <div className="-mt-2 ml-12 flex flex-col justify-center">
          <div className="mx-auto mt-4 w-8 sm:w-12 md:w-16">
            {isLoggedIn ? (
              <CircularProgressbar
                value={userData.awards?.progress}
                text={userData.awards?.level}
                styles={progressStyles}
                background
                strokeWidth={15}
                backgroundPadding={0}
              />
            ) : (
              <p className="text-center text-teal-500">Loading...</p>
            )}
          </div>
          <p className="font-cthulhumbus pt-1 text-center text-xs text-teal-500">Karma</p>
        </div>
      </div>
    </nav>
  );
};

export default UserBar;
