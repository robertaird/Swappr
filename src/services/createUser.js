import axios from 'axios';

export default {
  createUser(newUser) {
    axios.post('/users', newUser)
      .then(createdUser => console.log(createdUser));
  },
  getUser({ id_facebook }) {
    const config = {
      headers: {
        id_facebook,
      },
    };
    axios.get('/users', config);
  },
};
