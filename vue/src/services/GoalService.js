import axios from 'axios';
//import store from "../store/index.js";

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

    updateFavoriteStatus(goalId, favoriteStatus) {
      return axios.put(`/update-favorite-status/${goalId}/${favoriteStatus}`);
    },

    getGoalByGoalId(goalId) {
      return axios.get(`/get-goal/${goalId}`);
    },

    getAndCheckGoals() {
      return axios.get('/get-and-check-goals');
    },
    terminateGoal(goalId) {
      return axios.put(`/goal-early-termination/${goalId}`)
    }
}