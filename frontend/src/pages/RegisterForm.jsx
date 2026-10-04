import { useDeferredValue, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';
import { Alert, Backdrop, Button, CircularProgress, LinearProgress, TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { ZxcvbnFactory } from '@zxcvbn-ts/core';
import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common';
import * as zxcvbnEnPackage from '@zxcvbn-ts/language-en';
import * as zxcvbnDePackage from '@zxcvbn-ts/language-de';
import { matcherPwnedFactory } from '@zxcvbn-ts/matcher-pwned';
import { useRedirectIfLoggedIn } from '../context/AuthProvider';
import { AuthLayout, PasswordField } from '../assets/components/Cosmos';

const zxcvbn = new ZxcvbnFactory(
  {
    dictionary: {
      ...zxcvbnCommonPackage.dictionary,
      ...zxcvbnEnPackage.dictionary,
      ...zxcvbnDePackage.dictionary,
    },
    graphs: zxcvbnCommonPackage.adjacencyGraphs,
    useLevenshteinDistance: true,
    translations: zxcvbnEnPackage.translations,
  },
  { pwned: matcherPwnedFactory(fetch) },
);

const usePasswordStrength = (password) => {
  const [result, setResult] = useState(null);
  const deferredPassword = useDeferredValue(password);
  useEffect(() => {
    zxcvbn.checkAsync(deferredPassword).then(setResult);
  }, [deferredPassword]);
  return result;
};

// zxcvbn score 0-4 -> MUI color
const strengthColors = ['error', 'error', 'warning', 'info', 'success'];

function RegisterForm() {
  useRedirectIfLoggedIn();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [registered, setRegistered] = useState(false);
  const result = usePasswordStrength(formData.password);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) return toast.error('🙅‍♂ Passwords do not match.');
    if (!result || result.score < 3) return toast.error('🙅‍♂ We do not approve your weak password!');

    try {
      const { username, email, password } = formData;
      await axios.post('/auth/register', { username, email, password });
      toast.success('🫱🏼‍🫲🏾 Welcome new member of the cult!');
      setRegistered(true);
      setTimeout(() => navigate('/login'), 3000);
    } catch (error) {
      toast.error(error.response?.data.error ?? 'Registration failed');
    }
  };

  const passwordProps = {
    show: showPassword,
    onToggleShow: () => setShowPassword(!showPassword),
    autoComplete: 'new-password',
    onChange: handleChange,
  };

  return (
    <AuthLayout title="Register">
      <form onSubmit={handleRegister}>
        <TextField
          fullWidth
          required
          label="Username"
          autoComplete="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          required
          type="email"
          label="Email"
          autoComplete="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <PasswordField label="Password" name="password" value={formData.password} {...passwordProps} />
        {result && (
          <>
            <LinearProgress
              variant="determinate"
              value={result.score * 25}
              color={strengthColors[result.score]}
              sx={{ borderRadius: 4 }}
            />
            {result.feedback.warning && <Alert severity="warning">{result.feedback.warning}</Alert>}
            {result.feedback.suggestions.map((suggestion) => (
              <Alert key={suggestion} severity="info">
                {suggestion}
              </Alert>
            ))}
          </>
        )}
        <PasswordField
          label="Confirm Password"
          name="confirmPassword"
          sx={{ mt: 1.2 }}
          value={formData.confirmPassword}
          {...passwordProps}
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 3, mb: 2, bgcolor: 'teal', color: 'white' }}>
          Register
        </Button>
        <p className="mt-2 text-center text-xs text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="text-teal-600 underline">
            Login
          </Link>
        </p>
      </form>
      <Backdrop sx={{ color: '#fff', zIndex: 99 }} open={registered} onClick={() => navigate('/login')}>
        <div style={{ textAlign: 'center' }}>
          <Typography
            variant="h3"
            component="div"
            className="font-cthulhumbus mx-14 bg-linear-to-br from-white to-gray-400 bg-clip-text text-center font-bold">
            You are now part of the cult. <br /> Continue by logging in.
          </Typography>
          <CircularProgress color="success" sx={{ marginTop: 2 }} />
        </div>
      </Backdrop>
    </AuthLayout>
  );
}

export default RegisterForm;
