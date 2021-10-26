<template>
  <div class="container">
      <div class="goalsContainer">
          <table>
          <tr class="headers">
              <th>Goal</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Target</th>
              <th>Current Score</th>
          </tr>
          <tr class="goalRow" v-for="goal in goals" v-bind:key="goal.key" v-on:click="goToGoal(goal.goalId)">
            <td>{{goal.summary}}</td>
            <td>{{goal.startDate}}</td>
            <td>{{goal.endDate}}</td>
            <td>{{goal.goal}}</td>
            <td>{{goal.currentScore}}</td>
          </tr>
          </table>
          <router-link :to="{name: 'newGoal'}">New Goal</router-link>
      </div>
      <div class="scoreContainer">

      </div>
  </div>
</template>

<script>
import GoalService from "../../services/GoalService.js";
import ScoreService from "../../services/ScoreService.js";

export default {
  data() {
    return {
      goals: [],
      currentDate: "",
    }
  },
  created() {
    // setting current date
    if (this.$store.state.currentDate === "") {
      this.$store.commit("SET_CURRENT_DATE");
    }
    this.currentDate = this.$store.state.currentDate; 

    // pulling all active or future goals
    GoalService.getCurrentGoals().then(
      (response) => {
        this.goals = response.data;
        this.goals = this.goals.filter(goal => goal.active || goal.endDate >= this.currentDate);

        // checking if goals are still active or need to be activated by date
        this.goals.forEach(goal => {
          if (goal.active && goal.endDate < this.currentDate) {
            GoalService.updateActiveStatus(goal.goalId, false);
            goal.active = false;
          } 
          else if (goal.active === false && goal.startDate <= this.currentDate) {
            GoalService.updateActiveStatus(goal.goalId, true);
            goal.active = true;
          }
        })

        // refilter goals so only active goals remain
        this.goals = this.goals.filter(goal => goal.active);

        // pulling scores from DB for active goals 
        this.goals.forEach(goal => ScoreService.getScoresByGoalId(goal.goalId).then(
          (response) => {
            let currentScore = 0;
            response.data.forEach(scores => currentScore += scores.score);
            goal.currentScore = currentScore;
          }
        )
        )
      });
    
  },
  methods: {
    goToGoal(goalId) {
      this.$router.push(`/goal-details/${goalId}`)
    },
  }
}
</script>

<style >
.container {
  display: grid;
}
.goalsContainer {
  min-height: 600px;
  max-width: 500px;
  border: 2px red solid;
}
table {
    border-spacing: 15px;
}
.scoreContainer {
  min-height: 600px;
  max-width: 300px;
  border: 2px red solid;
}
.goalRow:hover {
  background-color:cadetblue;
  cursor: pointer;
}
</style>