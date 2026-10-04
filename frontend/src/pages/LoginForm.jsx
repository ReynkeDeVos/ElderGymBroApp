import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';
import { Button, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthProvider';
import { AuthLayout, PasswordField } from '../assets/components/Cosmos';

function LoginForm() {
  const { isLoggedIn, checkUser, userData } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    checkUser().then(() => setChecked(true));
  }, [checkUser]);

  // Once logged in, continue onboarding or go home
  useEffect(() => {
    if (!checked || !isLoggedIn) return;
    const { gender, fitnessLevel, workoutAim } = userData;
    if (gender && fitnessLevel && workoutAim) {
      toast.success('🎉 Welcome back. Happy grinding', { autoClose: 1000 });
      navigate('/home');
    } else {
      if (!gender && !fitnessLevel && !workoutAim) toast.success('🏆 Successfully logged in! Welcome mortal');
      else toast.info('🚀 Finish your onboarding');
      navigate('/startyourjourney');
    }
  }, [checked, isLoggedIn, userData, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/login', { email, password });
      await checkUser();
    } catch (error) {
      toast.error(error.response?.data.error ?? 'Login failed');
    }
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={handleLogin}>
        <TextField
          fullWidth
          required
          type="email"
          label="Email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <PasswordField
          label="Password"
          name="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          show={showPassword}
          onToggleShow={() => setShowPassword(!showPassword)}
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 3, mb: 2, bgcolor: 'teal', color: 'white' }}>
          Login
        </Button>
        <p className="mt-2 text-center text-xs text-slate-400">
          Not registered yet?{' '}
          <Link to="/register" className="text-teal-600 underline">
            Register here
          </Link>
        </p>
        <div className="mt-2 text-center text-xs">
          <Link to="/forgotpassword" className="text-teal-600 underline">
            Forgot Password?
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}

export default LoginForm;
