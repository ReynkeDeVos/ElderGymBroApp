import { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { animate, motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Container, IconButton, InputAdornment, TextField } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const COLORS_TOP = ['#13FFAA', '#1E67C6', '#CE84CF', '#DD335C'];

// Slowly cycling accent colour plus the matching radial background.
export const useAurora = () => {
  const color = useMotionValue(COLORS_TOP[0]);
  useEffect(() => {
    const controls = animate(color, COLORS_TOP, {
      ease: 'easeInOut',
      duration: 10,
      repeat: Infinity,
      repeatType: 'mirror',
    });
    return () => controls.stop();
  }, [color]);
  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
  return { color, backgroundImage };
};

export const Starfield = () => (
  <Canvas style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
    <Stars radius={50} count={2500} factor={4} fade speed={2} />
  </Canvas>
);

// Full-height starry page with a centred form column (login / register).
export const AuthLayout = ({ title, children }) => {
  const { backgroundImage } = useAurora();
  return (
    <div style={{ position: 'relative', width: '100%', height: '100svh' }}>
      <Starfield />
      <motion.section style={{ backgroundImage }}>
        <Container
          maxWidth="sm"
          sx={{
            height: '100svh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            '& .MuiTextField-root': { mb: 2, '@media (max-width:600px)': { mb: 1 } },
            '& .MuiButton-root': { mt: 3 },
          }}>
          <h2 className="font-cthulhumbus my-8 max-w-3xl bg-linear-to-br from-white to-gray-400 bg-clip-text text-center text-3xl/tight font-medium text-transparent sm:text-5xl/none md:text-6xl/none">
            {title}
          </h2>
          {children}
        </Container>
      </motion.section>
    </div>
  );
};

export const PasswordField = ({ show, onToggleShow, ...props }) => (
  <TextField
    fullWidth
    required
    variant="outlined"
    type={show ? 'text' : 'password'}
    slotProps={{
      input: {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={onToggleShow}
              onMouseDown={(e) => e.preventDefault()}>
              {show ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      },
    }}
    {...props}
  />
);
