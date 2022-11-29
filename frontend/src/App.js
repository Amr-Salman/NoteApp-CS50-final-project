import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreateNote from './pages/CreateNote';
import NoteDetails from './pages/NoteDetails';
import Register from './pages/Register';
import MyDrawer from './components/Drawer';
import { useEffect, useState } from 'react';
import Login from './pages/Login';
import LoggedInRoutes from './pages/LoggedInRoutes';
import LoggedOutRoutes from './pages/LoggedoutRoutes';
import { useSelector } from 'react-redux';
import { selectAuth, selectAuthError } from './features/authSlice';
import { selectNotesError } from './features/notesSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  // Managing the drawer open and close state
  const [drawerStatus, setDrawerStatus] = useState(false);
  const ToggleDrawer = () => setDrawerStatus(!drawerStatus);
  const closeDrawer = () => setDrawerStatus(false);

  const auth = useSelector(selectAuth);
  const authError = useSelector(selectAuthError);
  const NotesError = useSelector(selectNotesError);

  // Check if there is error
  useEffect(() => {
    if (authError.status) {
      toast.error(authError.message);
    }
    if (NotesError.status) {
      toast.error(NotesError.message);
    }
  }, [auth, authError, NotesError]);

  return (
    <>
      <Router>
        <Navbar ToggleDrawer={ToggleDrawer} />
        <MyDrawer
          drawerStatus={drawerStatus}
          ToggleDrawer={ToggleDrawer}
          closeDrawer={closeDrawer}
        />
        <Routes>
          <Route element={<LoggedInRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateNote />} />
            <Route path="/note/:id" element={<NoteDetails />} />
          </Route>
          <Route element={<LoggedOutRoutes />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </>
  );
}

export default App;
