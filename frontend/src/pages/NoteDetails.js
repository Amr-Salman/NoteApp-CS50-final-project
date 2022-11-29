import { Box, TextField, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import NotesAPI from '../features/services/noteServices';
import { Link as MuiLink } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateNote } from '../features/notesSlice';

const NoteDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [note, setNote] = useState({});
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  useEffect(() => {
    const fetchNote = async () => {
      const data = await NotesAPI.get_note(params.id);
      setNote(data.payload);
      setTitle(data.payload.title);
      setDescription(data.payload.description);
    };
    fetchNote();
  }, [params]);
  if (title.length <= 0 && description.length <= 0) {
    return (
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const editedNote = {
      _id: note._id,
      title,
      description,
    };
    dispatch(updateNote(editedNote));
    navigate('/');
  };
  return (
    <Box sx={{ height: '100%' }} component="main">
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6">Note Details</Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoFocus
          />
          <TextField
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            margin="normal"
            required
            fullWidth
            name="description"
            label="Description"
            type="text"
            id="description"
            multiline
            rows={4}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Edit
          </Button>
          <MuiLink component={Link} to="/" variant="body2">
            {'< Back'}
          </MuiLink>
        </Box>
      </Box>
    </Box>
  );
};

export default NoteDetails;
