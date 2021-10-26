<template>
  <div>
      <h1>{{goal.summary}}</h1>
      <h2>{{currentScore}}</h2>
      <div>
          <h3>{{goal.description}}</h3>
      </div>
      <h3>scores</h3>
      <table class="scoresTable">
          <tr class="headers">
              <th>Date</th>
              <th>Score</th>
          </tr>
          <tr class="scores" v-for="score in scores" v-bind:key="score.key">
              <td>{{score.date}}</td>
              <td>{{score.score}}</td>
          </tr>
      </table>
  </div>
</template>

<script>
import ScoreService from "../services/ScoreService.js";
import GoalService from "../services/GoalService.js";

export default {
    data() {
        return {
            goalId: "",
            goal: {},
            scores: [],
            currentScore: 0,
        }
    },
    created() {
        this.goalId = this.$route.params.goalId;
        GoalService.getGoalByGoalId(this.goalId).then(
            (response) => {
                this.goal = response.data;
            }
        )
        ScoreService.getScoresByGoalId(this.goalId).then(
            (response) => {
                this.scores = response.data;
                this.scores.forEach(
                    (score) => {
                        this.currentScore += score.score;
                    })
            }
        )
    },
    
}
</script>

<style>

</style>