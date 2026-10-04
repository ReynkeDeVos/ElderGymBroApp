import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion, useMotionTemplate } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import landingPageImage from '../assets/images/landingPage.avif';
import avatarImage from '../assets/images/avatar.avif';
import avatarImage2 from '../assets/images/avatar2.avif';
import avatarImage3 from '../assets/images/avatar3.avif';
import logoImage from '../assets/icons/elderGymBroLogo.png';
import { useRedirectIfLoggedIn } from '../context/AuthProvider';
import { Starfield, useAurora } from '../assets/components/Cosmos';

const testimonials = [
  {
    imgUrl: avatarImage2,
    testimonial: 'My workout plan was very... transformative...',
    author: 'Jenn F. - Marketing Director',
  },
  { imgUrl: avatarImage, testimonial: "Ph'nglui mglw'nafh Cthulhu R'lyeh wgah'nagl fhtagn", author: 'Kevin' },
  {
    imgUrl: avatarImage3,
    testimonial: 'Listen to the siren call & join us at the Elder Gym Bro!',
    author: "Y'Golonac - Personal Trainer",
  },
];

const LandingPage = () => {
  useRedirectIfLoggedIn();
  const navigate = useNavigate();
  const { color, backgroundImage } = useAurora();
  const border = useMotionTemplate`0.2px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;
  const [order, setOrder] = useState(['front', 'middle', 'back']);

  // Front card goes to the back
  const handleShuffle = () => setOrder((o) => [o.at(-1), ...o.slice(0, -1)]);

  return (
    <motion.section
      style={{ backgroundImage }}
      className="relative grid min-h-svh place-content-center place-items-center overflow-hidden bg-gray-950 px-4 pt-5 text-gray-200 md:pt-10">
      <div className="mb-2 flex flex-row justify-evenly space-x-10">
        <img src={logoImage} alt="Logo" className="h-16 w-16" />
        <h1 className="font-cthulhumbus max-w-3xl bg-linear-to-br from-white to-gray-400 bg-clip-text text-center text-2xl leading-tight font-medium text-transparent sm:text-5xl md:text-6xl">
          Train Like an <br />
          Ancient God
        </h1>
      </div>

      <img src={landingPageImage} alt="Landing Page Image" className="w-4/5 md:w-auto" />
      <div className="relative z-10 flex flex-col items-center">
        <motion.button
          style={{ border, boxShadow }}
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.985 }}
          className="group relative flex w-fit items-center gap-1.5 rounded-full bg-gray-950/10 px-4 py-2 text-gray-50 transition-colors hover:bg-gray-950/50"
          onClick={() => navigate('/register')}>
          Join the Cult
          <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
        </motion.button>
        <p className="mt-4 text-xs text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="text-teal-600 underline">
            Login
          </Link>
        </p>
      </div>
      <Starfield />
      <div className="px-8 text-slate-50 md:py-4">
        <div className="relative -ml-[100px] h-[450px] w-[350px] scale-75 md:-ml-[175px]">
          {testimonials.map((t, i) => (
            <Card key={t.author} {...t} handleShuffle={handleShuffle} position={order[i]} />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

const Card = ({ handleShuffle, testimonial, position, imgUrl, author }) => {
  const mousePosRef = useRef(0);

  const onDragEnd = (e) => {
    if (mousePosRef.current - e.clientX > 150) handleShuffle();
    mousePosRef.current = 0;
  };

  const x = { front: '0%', middle: '33%', back: '66%' }[position];
  const rotate = { front: '-6deg', middle: '0deg', back: '6deg' }[position];
  const zIndex = { front: 2, middle: 1, back: 0 }[position];
  const draggable = position === 'front';

  return (
    <motion.div
      style={{ zIndex }}
      animate={{ rotate, x }}
      drag
      dragElastic={0.35}
      dragListener={draggable}
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      onDragStart={(e) => (mousePosRef.current = e.clientX)}
      onDragEnd={onDragEnd}
      transition={{ duration: 0.35 }}
      className={`absolute top-0 left-0 grid h-[450px] w-[350px] place-content-center space-y-6 rounded-2xl border-2 border-slate-700 bg-slate-800/20 p-6 shadow-xl backdrop-blur-md select-none ${
        draggable ? 'cursor-grab active:cursor-grabbing' : ''
      }`}>
      <img
        src={imgUrl}
        alt={`Image of ${author}`}
        className="pointer-events-none mx-auto h-32 w-32 rounded-full border-2 border-slate-700 bg-slate-200 object-cover"
      />
      <span className="text-center text-2xl text-slate-400 italic">&quot;{testimonial}&quot;</span>
      <span className="text-center font-medium text-indigo-400">{author}</span>
    </motion.div>
  );
};

export default LandingPage;
