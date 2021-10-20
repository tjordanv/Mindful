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
          <tr v-for="goal in goals" v-bind:key="goal.key">
            <td>{{goal.summary}}</td>
            <td>{{goal.startDate}}</td>
            <td>{{goal.endDate}}</td>
            <td>{{goal.goal}}</td>
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

export default {
  data() {
    return {
      goals: []
    }
  },
  created() {
    console.log(this.$store.state.userInfo);
    GoalService.getCurrentGoals().then(
      (response) => {
        this.goals = response.data;
        this.goals = this.goals.filter(goal => goal.active === true);
        console.log(this.goals);
      });
    
  },
  methods: {
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
</style>