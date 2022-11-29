import axios from 'axios';

const URL = 'http://localhost:5000/';

// Get all notes
const get_all_notes = async () => {
  const token = localStorage.getItem('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.get(URL + 'api/note', config);
  return res.data;
};

// Get single note
const get_note = async (id) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.get(URL + 'api/note/' + id, config);
  return res.data;
};

// Edit note
const update_note = async (note) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.put(URL + 'api/note/' + note._id, note, config);
  return res.data;
};

// Delete note
const delete_note = async (id) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.delete(URL + `api/note/` + id, config);
  return res.data;
};

// create note
const create_note = async (note) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.post(URL + 'api/note', note, config);
  return res.data;
};

const NotesAPI = {
  get_all_notes,
  get_note,
  update_note,
  delete_note,
  create_note,
};
export default NotesAPI;
