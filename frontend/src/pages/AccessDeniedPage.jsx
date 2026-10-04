import { useNavigate } from 'react-router';
import { Button } from '@mui/material';
import accessDeniedImage from '../assets/images/access-denied.jpg';
import { Starfield } from '../assets/components/Cosmos';

function AccessDeniedPage() {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center text-center text-white">
      <img src={accessDeniedImage} alt="Access Denied" className="mb-8 rounded-full" />
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/login')}
        style={{ marginTop: '1rem', textTransform: 'none' }}>
        Login first
      </Button>
      <Starfield />
    </div>
  );
}

export default AccessDeniedPage;
