import axios from 'axios';

const URL = 'http://localhost:5000/';

const login = async (data) => {
  const res = await axios.post(URL + 'api/auth/login', data);
  if (res.status === 200) {
    localStorage.setItem('token', res.data.payload.token);
    localStorage.setItem('username', res.data.payload.username);
  }
  return res.data;
};
const signup = async (data) => {
  const res = await axios.post(URL + 'api/auth/signup', data);
  if (res.status === 201) {
    localStorage.setItem('token', res.data.payload.token);
    localStorage.setItem('username', res.data.payload.username);
  }
  return res.data;
};

const authAPI = {
  login,
  signup,
};
export default authAPI;
