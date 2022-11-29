import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteNote } from '../features/notesSlice';
import { motion, AnimatePresence } from 'framer-motion';
import Masonry from '@mui/lab/Masonry';
import {
  Card,
  Button,
  Typography,
  CardContent,
  CardActions,
  CardHeader,
  IconButton,
} from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { selectNotesSlice } from '../features/notesSlice';
import { useSelector } from 'react-redux';

const NoteCardList = ({ notes }) => {
  const dispatch = useDispatch();
  const notesSlice = useSelector(selectNotesSlice);
  const deleteHandler = async (id) => {
    dispatch(deleteNote(id));
  };

  if (notesSlice.status === 'fulifilled' && notes.length === 0) {
    return (
      <Typography variant="h6" sx={{ textAlign: 'center' }}>
        No notes avaliable, start writing notes
      </Typography>
    );
  }
  return (
    <>
      {notes.length > 0 ? (
        <Masonry
          columns={{ xs: 1, sm: 2, md: 3 }}
          spacing={2}
          sx={{ margin: 0 }}
        >
          <AnimatePresence>
            {notes.length > 0 &&
              notes.map((note, index) => (
                <Card
                  key={note._id}
                  component={motion.div}
                  initial={{ opacity: 0, y: -50 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: index * 0.2,
                    },
                  }}
                  exit={{
                    y: 50,
                    opacity: 0,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                  sx={{ minWidth: 275 }}
                >
                  <CardHeader
                    action={
                      <IconButton
                        aria-label="delete"
                        color="error"
                        onClick={() => deleteHandler(note._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                    title={
                      note.title.length > 50
                        ? note.title.slice(0, 50) + '...'
                        : note.title
                    }
                    subheader={format(new Date(note.createdAt), 'do MMMM Y')}
                  />
                  <CardContent>
                    <Typography variant="body2" color="textSecondary">
                      {note.description.length > 50
                        ? note.description.slice(0, 100) + '...'
                        : note.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      sx={{ marginBottom: 1 }}
                      component={Link}
                      to={`/note/${note._id}`}
                      variant="contained"
                      endIcon={<KeyboardArrowRightIcon />}
                    >
                      View
                    </Button>
                  </CardActions>
                </Card>
              ))}
          </AnimatePresence>
        </Masonry>
      ) : (
        <Typography sx={{ textAlign: 'center' }} variant="h6">
          Loading...
        </Typography>
      )}
    </>
  );
};

export default NoteCardList;
