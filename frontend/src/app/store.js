import { configureStore } from '@reduxjs/toolkit';
import noteReducer from '../features/notesSlice';
import authReducer from '../features/authSlice';

const store = configureStore({
  reducer: {
    notes: noteReducer,
    auth: authReducer,
  },
});

export default store;
