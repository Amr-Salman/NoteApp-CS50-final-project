import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link as MuiLink } from '@mui/material';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth, signup } from '../features/authSlice';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <MuiLink component={Link} color="inherit" to="/">
        NoteApp
      </MuiLink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(selectAuth);
  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      email: email,
      password: password,
      username: username[0].toUpperCase() + username.slice(1),
    };
    console.log(newUser);
    dispatch(signup(newUser));
    if (userData.token) {
      navigate('/');
    }
  };

  return (
    <Box component="main">
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 1, maxWidth: 500 }}
        >
          <TextField
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <MuiLink component={Link} to="/login" variant="body2">
            {'Already have an Account? Login'}
          </MuiLink>
          <Copyright sx={{ mt: 5 }} />
        </Box>
      </Box>
    </Box>
  );
};
export default Register;
