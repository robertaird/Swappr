import axios from 'axios';

export default {
  createUser(newUser) {
    axios.post('/users', newUser)
      .then(createdUser => console.log(createdUser));
  },
  getUser(authId) {
    const config = {
      id_facebook: authId,
    };
    axios.get('/users', config);
  },
};
