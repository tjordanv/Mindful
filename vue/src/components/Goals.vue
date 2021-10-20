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
          <tr class="goalRow" v-for="goal in goals" v-bind:key="goal.key" v-on:click="logScore(goal.goalId)">
            <td>{{goal.summary}}</td>
            <td>{{goal.startDate}}</td>
            <td>{{goal.endDate}}</td>
            <td>{{goal.goal}}</td>
            <td>{{goal.currentScore}}</td>
          </tr>
          </table>
          <button >I dont do anything</button>
      </div>
      <div class="scoreContainer">

      </div>
  </div>
</template>

<script>
import GoalService from "../services/GoalService.js";
import ScoreService from "../services/ScoreService.js";

export default {
  data() {
    return {
      goals: [],
    }
  },
  beforeCreate() {
    console.log(this.$store.state.userInfo);
    GoalService.getCurrentGoals().then(
      (response) => {
        this.goals = response.data;
        this.goals = this.goals.filter(goal => goal.active === true);
        console.log(this.goals);
        this.goals.forEach(goal => ScoreService.getScoresByGoalId(goal.goalId).then(
          (response) => {
            let currentScore = 0;
            response.data.forEach(scores => currentScore += scores.score);
            goal.currentScore = currentScore;
            console.log(goal.currentScore);
          }
        )
        )
      });
    
  },
  methods: {
    logScore(element) {
      ScoreService.getScoresByGoalId(element).then(
        (response) => {
          console.log(response.data);
        })
      console.log(this.goals[0].currentScore);  
    }
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