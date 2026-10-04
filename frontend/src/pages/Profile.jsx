import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { api } from '../utils/api';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthProvider';
import logoutIcon from '../assets/icons/logout1.png';

const textFields = [
  ['fullName', 'Full Name', 'text'],
  ['username', 'Username', 'text'],
  ['age', 'Age', 'number'],
  ['weight', 'Weight (kg)', 'number'],
];

const Profile = () => {
  const { userData, setUserData, setIsLoggedIn, checkUser } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(null); // null = not editing

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  const handleImageChange = async (e) => {
    const body = new FormData();
    body.append('avatar', e.target.files[0]);
    try {
      const data = await api('/profile/me/avatar', { method: 'PATCH', body });
      setUserData((user) => ({ ...user, avatar: data.avatar }));
    } catch {
      toast.error('Failed to upload avatar');
    }
  };

  const logOut = async () => {
    try {
      await api('/auth/logout', { method: 'POST' });
      setIsLoggedIn(false);
      setUserData({});
      navigate('/login');
    } catch {
      toast.error('Logout failed');
    }
  };

  const startEditing = () =>
    setForm({
      fullName: userData.fullName ?? '',
      username: userData.username ?? '',
      age: userData.age ?? '',
      weight: userData.weight ?? '',
      gender: userData.gender ?? '',
    });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api('/profile/me/profileupdate', { method: 'PATCH', body: form });
      await checkUser();
      setForm(null);
    } catch (error) {
      toast.error(
        error.status === 409
          ? 'Username already exists. Please choose a different one.'
          : 'Failed to update profile. Please try again later.',
      );
    }
  };

  if (form) {
    return (
      <div className="min-h-screen bg-linear-to-br from-black to-blue-950 pt-20 text-gray-200">
        <div className="flex flex-row justify-center">
          <h1 className="font-cthulhumbus cursor-default bg-linear-to-br from-white to-gray-400 bg-clip-text py-2 text-center text-3xl/tight font-medium text-transparent sm:py-4 md:pt-8 md:text-4xl/10">
            Edit Profile
          </h1>
        </div>
        <div className="flex flex-row justify-center p-6">
          <Box
            component="form"
            sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            className="flex flex-col items-center">
            {textFields.map(([name, label, type]) => (
              <TextField
                key={name}
                id={name}
                name={name}
                label={label}
                type={type}
                value={form[name]}
                onChange={handleChange}
              />
            ))}
            <FormControl sx={{ width: '25ch' }}>
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select labelId="gender-label" id="Gender" name="gender" value={form.gender} onChange={handleChange}>
                <MenuItem value="">-- Clear Field --</MenuItem>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="elder thing">Elder Thing</MenuItem>
                <MenuItem value="blob">Blob</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, backgroundColor: 'teal', color: 'white' }}>
              Save
            </Button>
            <Button
              type="button"
              variant="contained"
              sx={{ mt: 1, backgroundColor: 'grey', color: 'white' }}
              onClick={() => setForm(null)}>
              Cancel
            </Button>
          </Box>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-black to-blue-950 pt-20 text-gray-200">
      <div className="flex flex-row justify-center">
        <h2 className="font-cthulhumbus cursor-default bg-linear-to-br from-white to-gray-400 bg-clip-text py-2 text-center text-3xl/tight font-medium text-transparent sm:py-4 md:pt-8 md:text-4xl/10">
          Profile
        </h2>
      </div>

      <div className="mt-2 flex flex-row justify-center">
        <div className="flex flex-col justify-center">
          <div className="avatar">
            <div className="mx-auto w-36 rounded-full ring-4 ring-teal-700 ring-offset-2 ring-offset-pink-800">
              <img src={userData.avatar} alt="Profile Image" className="rounded-full object-cover" />
            </div>
          </div>

          <div className="flex flex-row justify-center">
            <div className="-mt-6">
              <div className="absolute max-w-12 cursor-pointer rounded-full bg-pink-900 p-2 transition-transform hover:scale-110">
                <label htmlFor="profile-image-input" className="flex cursor-pointer flex-col items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                    />
                  </svg>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id="profile-image-input"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
            </div>
          </div>

          <h1 className="font-cthulhumbus mt-4 cursor-default bg-linear-to-br from-yellow-950 to-yellow-500 bg-clip-text pt-4 text-center text-4xl/tight font-medium text-transparent sm:text-2xl/8 md:text-4xl/10">
            {userData.awards?.title || 'The infamous'}
          </h1>
          <h1 className="font-cthulhumbus cursor-default bg-linear-to-br from-teal-500 to-green-800 bg-clip-text py-2 text-center text-3xl/tight font-medium text-transparent sm:text-4xl/10 md:text-5xl/none">
            {userData.fullName || 'Lord of the Gym'}
          </h1>
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center space-y-4">
        <Button
          variant="contained"
          onClick={startEditing}
          sx={{ mt: 4, mb: 2, backgroundColor: '#831843', color: 'white', textTransform: 'none' }}>
          Edit Profile
        </Button>
        <div className="absolute top-0 right-4">
          <img src={logoutIcon} className="w-16 cursor-pointer" alt="Logout" onClick={logOut} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
