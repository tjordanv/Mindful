import axios from 'axios';

export default {

    getCurrentGoals() {
        return axios.get('/current-goals');
      },

}