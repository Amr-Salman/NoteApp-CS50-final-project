import { Container, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NoteCardList from '../components/NoteCardList';
import { selectAuth } from '../features/authSlice';
import { getAllNotes, selectNotes } from '../features/notesSlice';

const Home = () => {
  const notes = useSelector(selectNotes);
  const userData = useSelector(selectAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Check if the user Logged in
  // If true then fetch his notes
  useEffect(() => {
    if (!userData.token) {
      navigate('/login');
    }
    if (userData.token) {
      dispatch(getAllNotes());
    }
  }, [userData, dispatch, navigate]);
  return (
    <Container maxWidth="lg" component="main" sx={{ marginTop: 2 }}>
      <Typography variant="h4" component="h1" sx={{ marginBottom: 2 }}>
        Notes
      </Typography>

      <NoteCardList notes={notes} />
    </Container>
  );
};

export default Home;
