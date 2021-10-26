import axios from 'axios';

export default {

    getCurrentGoals() {
        return axios.get('/current-goals');
      },

    createNewGoal(newGoal) {
      return axios.post('/new-goal', newGoal);
    },
    
    updateActiveStatus(goalId, activeStatus) {
      return axios.put(`/update-active-status/${goalId}/${activeStatus}`);
    },

    getGoalByGoalId(goalId) {
      return axios.get(`/get-goal/${goalId}`);
    }
}