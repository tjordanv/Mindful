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
    }

    // getAndCheckGoals(ScoreService, currentDate) {
    //   // pulling all active or future goals
    //   let goals = {};
    //   this.getCurrentGoals().then(
    //     (response) => {
    //       goals = response.data;
    //       goals = goals.filter(goal => goal.active || goal.endDate >= currentDate);
    //       // checking if goals are still active or need to be activated by date
    //       goals.forEach(goal => {
    //         if (goal.active && goal.endDate < currentDate) {
    //           this.updateActiveStatus(goal.goalId, false);
    //           goal.active = false;
    //         } 
    //         else if (goal.active === false && goal.startDate <= currentDate) {
    //           this.updateActiveStatus(goal.goalId, true);
    //           goal.active = true;
    //         }
    //       })

    //       // refilter goals so only active goals remain
    //       goals = goals.filter(goal => goal.active);
    //       store.commit("UPDATE_ACTIVE_GOALS", goals.length);

    //       // pulling scores from DB for active goals 
    //       goals.forEach(goal => ScoreService.getScoresByGoalId(goal.goalId).then(
    //         (response) => {
    //           let currentScore = 0;
    //           response.data.forEach(scores => currentScore += scores.score);
    //           goal.currentScore = currentScore;
    //         }
    //       )
    //       )
    //     }).finally(() => this.goalCheckerHelper(goals))
    //     return goals;
    //   },
    //   goalCheckerHelper(goals) {
    //     return goals;
    //   }
}