import axios from 'axios';
import { SERVER_URI } from '../constants';

export default {
  createUser(newUser) {
    return axios.post(`${SERVER_URI}/users`, newUser);
  },
};
