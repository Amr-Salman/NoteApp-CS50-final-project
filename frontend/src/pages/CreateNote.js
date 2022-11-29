import { Typography, TextField, Button, Container } from '@mui/material';
import React, { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createNote } from '../features/notesSlice';

const CreateNote = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Submit handler for the form
  const submitHandler = (e) => {
    e.preventDefault();
    setTitleError(false);
    // Validate the Inputs
    setDescriptionError(false);
    if (title === '' || title.trim() === '') {
      setTitleError(true);
      setTitle('');
    }
    if (description === '' || description.trim() === '') {
      setDescriptionError(true);
      setDescription('');
    }
    if (title.trim() && description.trim()) {
      const note = {
        title,
        description,
        user: 'Amr Salman',
      };

      // Create the note
      dispatch(createNote(note));
      setTimeout(() => {
        navigate('/');
      }, 500);
    }
  };
  return (
    <Container component="main" sx={{ marginTop: 2 }} maxWidth="lg">
      <Typography variant="h4" component="h2" gutterBottom>
        Create a New Note
      </Typography>
      <form noValidate autoComplete="off" onSubmit={submitHandler}>
        <TextField
          sx={{
            marginTop: 2,
          }}
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          id="outlined-basic"
          variant="outlined"
          label="Title"
          fullWidth
          required
          error={titleError}
        />
        <TextField
          sx={{
            marginTop: 2,
          }}
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          id="outlined-basic"
          variant="outlined"
          label="Description"
          fullWidth
          required
          multiline
          rows={4}
          error={descriptionError}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
          endIcon={<SendIcon />}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default CreateNote;
