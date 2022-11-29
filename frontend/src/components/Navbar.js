import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuth, logout } from '../features/authSlice';
import { clear } from '../features/notesSlice';
import { Avatar } from '@mui/material';

const Navbar = ({ ToggleDrawer }) => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(clear());
    navigate('/login');
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {auth.token && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => ToggleDrawer()}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ flexGrow: 1, textDecoration: 'none', color: 'white' }}
          >
            NoteApp
          </Typography>
          {!auth.token && (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/login"
                endIcon={<LoginIcon />}
              >
                Login
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/register"
                endIcon={<PersonIcon />}
              >
                Register
              </Button>
            </>
          )}
          {auth.token && (
            <>
              {/* <Button color="inherit" component={Link} to="/create">
                Create Note
              </Button> */}
              <Avatar
                sx={{
                  width: 30,
                  height: 30,
                  bgcolor: 'white',
                  color: 'primary.main',
                }}
              >
                {auth.username[0]}
              </Avatar>
              <Typography sx={{ marginLeft: 1 }} noWrap>
                Hello,{' '}
                {auth.username.split(' ')[0].length > 10
                  ? auth.username.split(' ')[0].slice(0, 10)
                  : auth.username.split(' ')[0]}
              </Typography>
              <Button
                color="inherit"
                onClick={logoutHandler}
                endIcon={<LogoutIcon />}
                sx={{ marginLeft: 1 }}
              >
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
