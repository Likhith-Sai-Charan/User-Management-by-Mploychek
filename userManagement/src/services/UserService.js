import axios from 'axios';

const API_URL = 'http://localhost:5000/api/admin';

const UserService = {
  getUsers: (delay = 0) => axios.get(`${API_URL}/users?delay=${delay}`),

  createUser: (userData) => axios.post(`${API_URL}/users`, userData),

  deleteUser: (userId) => axios.delete(`${API_URL}/users/${userId}`),
};

export default UserService;
