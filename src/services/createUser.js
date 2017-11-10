import axios from 'axios';

export default {
  createUser(newUser) {
    return axios.post('/users', newUser);
  },
};
