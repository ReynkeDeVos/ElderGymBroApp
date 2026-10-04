import { lazy, Suspense, useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router';
import { Slide, ToastContainer, toast } from 'react-toastify';
import { api } from './utils/api';
import LandingPage from './pages/LandingPage';
import Profile from './pages/Profile';
import StartYourJourney from './pages/onboarding/StartYourJourney';
import WhatsYourGoal from './pages/onboarding/WhatsYourGoal';
import SetYourGrind from './pages/onboarding/SetYourGrind';
import Workouts from './pages/Workouts';
import SetUp from './pages/onboarding/SetUp';
import Trophys from './pages/Trophys';
import ForgotPassword from './pages/ForgotPassword';
import BottomNav from './assets/components/BottomNav';
import LoginForm from './pages/LoginForm';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import GenderWar from './pages/onboarding/GenderWar';
import ProgressTracker from './pages/ProgressTracker';
import UserBar from './assets/components/UserBar';
import UserWorkout from './pages/UserWorkout';
import PrivateRoute from './utils/PrivateRoute';
import AccessDeniedPage from './pages/AccessDeniedPage';

// Code-split: the password-strength dictionaries are ~1.5 MB and only needed here
const RegisterForm = lazy(() => import('./pages/RegisterForm'));

function App() {
  const [workouts, setWorkouts] = useState([]);
  const { pathname } = useLocation();
  const showUserBar = ['/home', '/workouts', '/trophys', '/progress'].includes(pathname);
  const showBottomNav = showUserBar || pathname === '/profile';

  useEffect(() => {
    api('/hardcodedworkouts')
      .then(setWorkouts)
      .catch(() => toast.error('Could not load the workouts'));
  }, []);

  return (
    <>
      {showBottomNav && <BottomNav />}
      {showUserBar && <UserBar />}
      <ToastContainer
        position="bottom-center"
        newestOnTop
        closeOnClick
        draggable
        pauseOnHover={false}
        theme="dark"
        transition={Slide}
      />
      <Suspense>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/accessdenied" element={<AccessDeniedPage />} />

          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Dashboard workouts={workouts} />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/trophys" element={<Trophys />} />
            <Route path="/workouts" element={<Workouts workouts={workouts} />} />
            <Route path="/progress" element={<ProgressTracker />} />
            <Route path="/setup" element={<SetUp />} />
            <Route path="/startyourjourney" element={<StartYourJourney />} />
            <Route path="/whatsyourgoal" element={<WhatsYourGoal />} />
            <Route path="/setyourgrind" element={<SetYourGrind />} />
            <Route path="/gender" element={<GenderWar />} />
            <Route path="/userworkout" element={<UserWorkout workouts={workouts} />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
