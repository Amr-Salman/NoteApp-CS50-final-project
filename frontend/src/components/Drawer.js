import React from 'react';
import { Link } from 'react-router-dom';
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Box } from '@mui/system';

const listItems = [
  {
    path: '/',
    title: 'Notes',
    icon: <InsertDriveFileIcon />,
  },
  {
    path: '/create',
    title: 'Create Note',
    icon: <NoteAddIcon />,
  },
];

const MyDrawer = ({ drawerStatus, ToggleDrawer, closeDrawer }) => {
  return (
    <Drawer anchor="left" open={drawerStatus} onClose={() => closeDrawer()}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: 1,
        }}
      >
        <IconButton
          size="large"
          edge={false}
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => closeDrawer()}
        >
          <ArrowBackIosIcon />
        </IconButton>
      </Box>
      <Divider />
      <List sx={{ width: 240 }} onClick={() => closeDrawer()}>
        {listItems.map((item) => (
          <ListItemButton component={Link} to={item.path} key={item.title}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default MyDrawer;
