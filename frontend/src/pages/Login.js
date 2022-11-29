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
import { login, selectAuth } from '../features/authSlice';

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

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(selectAuth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Submit the data and login
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { email: email, password: password };
    dispatch(login(user));
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
          Log In
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 1, maxWidth: 500 }}
        >
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
            autoFocus
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
          <MuiLink component={Link} to="/register" variant="body2">
            {"Don't have an account? Sign Up"}
          </MuiLink>
          <Copyright sx={{ mt: 5 }} />
        </Box>
      </Box>
    </Box>
  );
};
export default Login;
