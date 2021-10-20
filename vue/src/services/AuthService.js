import axios from 'axios';

export default {

  login(user) {
    return axios.post('/login', user)
  },

  getUserInfo() {
    return axios.get('/login/user-info')
  },

  register(user) {
    return axios.post('/register', user)
  }

}
