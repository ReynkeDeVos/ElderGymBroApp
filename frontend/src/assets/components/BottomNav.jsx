import { Link, useLocation } from 'react-router';
import { AiOutlineHome } from 'react-icons/ai';
import { PiBarbell } from 'react-icons/pi';
import { BsBarChart } from 'react-icons/bs';
import { GoPerson, GoTrophy } from 'react-icons/go';

const navItems = [
  { label: 'Home', icon: <AiOutlineHome />, path: '/home' },
  { label: 'Workouts', icon: <PiBarbell />, path: '/workouts' },
  { label: 'Progress', icon: <BsBarChart />, path: '/progress' },
  { label: 'Trophies', icon: <GoTrophy />, path: '/trophys' },
  { label: 'Profile', icon: <GoPerson />, path: '/profile' },
];

const BottomNav = () => {
  const { pathname } = useLocation();
  return (
    <nav className="fixed bottom-0 z-50 flex h-16 w-full items-center justify-around rounded-t-3xl bg-gray-900 shadow-md">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`flex flex-col items-center text-xs ${item.path === pathname ? 'text-teal-300' : 'text-gray-400'}`}>
          <div className="text-2xl">{item.icon}</div>
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default BottomNav;
