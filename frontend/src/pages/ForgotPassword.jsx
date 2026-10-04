import { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import cthulupassword from '../assets/images/cthulupassword.png';
import { useRedirectIfLoggedIn } from '../context/AuthProvider';
import { BackLink } from '../assets/components/Navigation';

// UI only for now: no reset email is actually sent.
function ForgotPassword() {
  useRedirectIfLoggedIn();
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200">
      <BackLink to="/" className="bg-gray-900" />
      <div className="mt-2 flex flex-row justify-center">
        <h1 className="font-cthulhumbus p-2 text-center text-3xl leading-tight font-medium text-teal-800 sm:text-3xl/9 md:text-4xl/10">
          Forgot Password
        </h1>
      </div>
      <div className="mt-6 flex flex-col place-items-center text-center">
        <p className="font-cthulhumbus text-xl md:text-4xl">Forgot Password?</p>
        <img src={cthulupassword} alt="Cthulu Forgot Password" className="mt-4 size-72" />
        <p className="mt-4 text-xs font-light tracking-wide text-slate-400">
          No problem! Please enter your e-mail address to receive a <br /> link to reset your password. Follow the
          instructions in the <br /> email to create a new password.
        </p>
        <Box
          component="form"
          sx={{ mt: 2 }}
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}>
          <TextField
            margin="normal"
            required
            fullWidth
            type="email"
            label="Enter your email address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 2, bgcolor: 'teal', color: 'white' }}>
            Send Reset Link
          </Button>
        </Box>
        {sent && (
          <p className="mt-2 text-xs font-light tracking-wide text-yellow-400">
            Please check your email inbox for the password reset link
          </p>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
