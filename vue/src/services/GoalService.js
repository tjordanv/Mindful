import axios from 'axios';

export default {

    getCurrentGoals() {
        return axios.get('/current-goals');
      },

    createNewGoal(newGoal) {
      return axios.post('/new-goal', newGoal);
    }  
}