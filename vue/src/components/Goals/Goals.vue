<template>
  <div class="container">
      <div class="goalsContainer">
          <table>
            <caption>Your Goals</caption>
            <thead>
              <tr>
                <th>Goal</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Target</th>
                <th>Current Score</th>
                <th>Favorite</th>
              </tr>
            </thead>
            <tbody>
              <tr class="goalRow" v-for="goal in goals" v-bind:key="goal.key">
                <td v-on:click="goToGoal(goal.goalId)">{{goal.summary}}</td>
                <td v-on:click="goToGoal(goal.goalId)">{{goal.startDate}}</td>
                <td v-on:click="goToGoal(goal.goalId)">{{goal.endDate}}</td>
                <td v-on:click="goToGoal(goal.goalId)">{{goal.goal}}</td>
                <td v-on:click="goToGoal(goal.goalId)">{{goal.currentScore}}</td>
                <td class="checkboxCell"><input class="favCheckbox" type="checkbox" 
                v-model="goal.favorite" v-on:click="favoriteGoal(goal)"></td>
              </tr>
            </tbody>
            <tfoot class="newGoal">
              <router-link  :to="{name: 'newGoal'}" v-if="goals.length < 8">New Goal</router-link>
            </tfoot>
          </table>
      </div>
      <div class="scoreContainer">
        <table>
            <caption>Add Scores</caption>
            <thead>
              <tr>
                <th>Add</th>
                <th>Date</th>
                <th>Score</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr class="scoreRow" v-for="goal in goals" v-bind:key="goal.key">
                <td><input type="checkbox" v-model="goal.submitScore"></td>
                <td><input type="date" v-model="goal.scoreDate"></td>
                <!-- TODO: add condition to assign appropriate input for the score -->
                <td><input type="number" v-if="goal.units != 'time'" v-model="goal.score">
                <input type="time" v-if="goal.units == 'time'" v-model="goal.score"></td>
                <td><textarea v-model="goal.scoreNotes"></textarea></td>
              </tr>
            </tbody>
            <tfoot class="scoreFooter">
              <button class="saveButton" v-on:click="saveScores">Save Scores</button>
            </tfoot>
          </table>
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
      scores: [],
    }
  },
  created() {
    // setting current date
    if (this.$store.state.currentDate === "") {
      this.$store.commit("SET_CURRENT_DATE");
    }

    

    this.currentDate = this.$store.state.currentDate; 

    GoalService.getAndCheckGoals().then(
      (response) => {
        this.goals = response.data
        this.$store.commit("UPDATE_ACTIVE_GOALS", this.goals.length);
        if (this.$store.state.favoriteGoals === "") {
          this.$store.commit("UPDATE_FAVORITE_GOALS", this.goals.length);
          this.goals.forEach(goal => {
            if (goal.favorite != true) {
              this.$store.commit("INCREMENT_FAVORITE_GOALS", -1);
            }
          })
        }
        this.goals.forEach(goal => ScoreService.getScoresByGoalId(goal.goalId).then(
          (response) => {
            let currentScore = 0;
            let currentTime = [0, 0];
            goal.totalScores = response.data.length;
            response.data.forEach(scores => {
              if (goal.units != 'time') {
                currentScore += scores.score;
                goal.currentScore = currentScore;
              } else {
                  let scoreStr = "";
                  scoreStr = scores.score.toString();
                  if (scores.score < 1000) {
                  scoreStr = '0' + scoreStr;
                  }
                  scoreStr = scoreStr.split('');
                  scoreStr = [scoreStr[0] + scoreStr[1], scoreStr[2] + scoreStr[3]]
                  currentTime[0] += Number(scoreStr[0]);
                  currentTime[1] += Number(scoreStr[1]);
                  goal.currentScore = currentTime;
              }
            })
            if (goal.movement == 'average up' || goal.movement == 'average down') {
              if (goal.units != 'time') {
                let tempScore = (goal.currentScore / response.data.length);
                goal.currentScore = tempScore.toFixed(2);
              } else {
                  let minutes = (goal.currentScore[0] * 60) + goal.currentScore[1];
                  goal.currentTime = minutes;
                  minutes /= response.data.length;
                  let amPm = minutes < 720 ? 'AM' : 'PM';
                  minutes = [Math.trunc(minutes / 60), Math.trunc(minutes % 60)]
                  if (minutes[1] < 10) {
                    minutes[1] = "0" + minutes[1].toString()
                  }
                  goal.currentScore = `${minutes[0]}:${minutes[1]} ${amPm}`
              }
            }
          }
        )
        )
      });
    
  },
  beforeMount() {
    GoalService.getAndCheckGoals().then(
      (response) => {
        this.goals = response.data
        this.$store.commit("UPDATE_ACTIVE_GOALS", this.goals.length);
        this.goals.forEach(goal => ScoreService.getScoresByGoalId(goal.goalId).then(
          (response) => {
            let currentScore = 0;
            let currentTime = [0, 0];
            goal.totalScores = response.data.length;
            response.data.forEach(scores => {
              if (goal.units != 'time') {
                currentScore += scores.score;
                goal.currentScore = currentScore;
              } else {
                  let scoreStr = "";
                  scoreStr = scores.score.toString();
                  if (scores.score < 1000) {
                  scoreStr = '0' + scoreStr;
                  }
                  scoreStr = scoreStr.split('');
                  scoreStr = [scoreStr[0] + scoreStr[1], scoreStr[2] + scoreStr[3]]
                  currentTime[0] += Number(scoreStr[0]);
                  currentTime[1] += Number(scoreStr[1]);
                  goal.currentScore = currentTime;
            }
            })
            if (goal.movement == 'average up' || goal.movement == 'average down') {
              if (goal.units != 'time') {
                let tempScore = (goal.currentScore / response.data.length);
                goal.currentScore = tempScore.toFixed(2);
              } else {
                  let minutes = (goal.currentScore[0] * 60) + goal.currentScore[1];
                  goal.currentTime = minutes;
                  minutes /= response.data.length;
                  let amPm = minutes < 720 ? 'AM' : 'PM';
                  minutes = [Math.trunc(minutes / 60), Math.trunc(minutes % 60)]
                  if (minutes[1] < 10) {
                    minutes[1] = "0" + minutes[1].toString()
                  }
                  goal.currentScore = `${minutes[0]}:${minutes[1]} ${amPm}`
              }
            }
          }
        )
        )
      });
  },
  methods: {
    goToGoal(goalId) {
      this.$router.push(`/goal-details/${goalId}`)
    },
    favoriteGoal(goal) {
      let goals = [];
      let favStatus = !goal.favorite;
      if (!favStatus) {
        this.$store.commit("INCREMENT_FAVORITE_GOALS", -1);
        GoalService.updateFavoriteStatus(goal.goalId, favStatus);
      }  else if (favStatus && this.$store.state.favoriteGoals < 3) {
        this.$store.commit("INCREMENT_FAVORITE_GOALS", 1);
        GoalService.updateFavoriteStatus(goal.goalId, favStatus);
      } else {
        // TODO: place a constrain that limits users to chosing 3 favorite goals.
          this.goals.forEach(storedGoal => {
          if (storedGoal.goalId == goal.goalId) {
            storedGoal.favorite = false;
          }
          goals.push(storedGoal);
          })
          this.goals = goals;
      }
    },
    saveScores() {
      this.goals.forEach(goal => {
        if (goal.submitScore) {
          if (goal.units != 'time') { 
            let newScore = {goalId: goal.goalId, date: goal.scoreDate, score: goal.score, notes: goal.scoreNotes};
            ScoreService.createScore(newScore);
          } else {
              let currentTime = goal.score.split(":");
              currentTime = currentTime[0] + currentTime[1];
              currentTime = Number(currentTime)
              let newScore = {goalId: goal.goalId, date: goal.scoreDate, score: currentTime, notes: goal.scoreNotes};
              ScoreService.createScore(newScore);
          }
          if (goal.units != 'time') {
            // TODO: my math is off here. I need to account for the weight of the current scores 
            // I cannot simply average the current and new score.
            if (goal.movement == 'total up' || goal.movement == 'total down') {
              goal.currentScore = Number(goal.currentScore) + Number(goal.score);
          } else if (goal.movement == 'average up' || goal.movement == 'average down') {
              let tempScore = ( (Number(goal.currentScore) * goal.totalScores) + Number(goal.score)) / (goal.totalScores + 1);
              goal.currentScore = tempScore.toFixed(2);
          }
          } else {
              let newTime = goal.score.split(":");
              newTime = (newTime[0] * 60) + Number(newTime[1]);
              console.log(goal.totalScores)
              let minutes = (goal.currentTime + newTime) / (goal.totalScores + 1);
              let amPm = minutes < 720 ? 'AM' : 'PM';
              minutes = [Math.trunc(minutes / 60), Math.trunc(minutes % 60)]
              if (minutes[1] < 10) {
                minutes[1] = "0" + minutes[1].toString()
              }
              goal.currentScore = `${minutes[0]}:${minutes[1]} ${amPm}`
          }

          goal.submitScore = false;
          goal.scoreDate = "";
          goal.score = "";
          goal.scoreNotes = "";
        }
      })
    },
    print(goal) {
      console.log(goal.score);
      let split = goal.score.split(':');
      console.log(split)
      split = (Number(split[0] + split[1]));

      split = split.toString();
      split = split.split('')
      split = [split[0] + split[1], split[2] + split[3]]
      console.log(split)
    }
  }
}
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: 
  "goals scores";
}
.goalsContainer {
  min-height: 600px;
  max-width: 500px;
  border: 2px red solid;
  grid-area: goals;
}
table, th, td {
  border: 2px solid blue;
  border-collapse: collapse;
}
caption {
  white-space: nowrap;
}
td {
  height: 50px;
}
th {
  height: 35px;
}
input {
  width: 130px;
}
input[type=checkbox] {
  width: 20px;
}
.newGoal {
  border-bottom: hidden;
  border-left:hidden;
  border-right: hidden;
}
.scoreContainer {
  min-height: 600px;
  max-width: 500px;
  border: 2px red solid;
  grid-area: scores;
}
.scoreFooter {
  border-bottom: hidden;
  border-left: hidden;
  border-right: hidden;
}
.saveButton {
  
}
.goalRow:hover {
  background-color:cadetblue;
  cursor: pointer;
}
.checkboxCell {
  background-color:white;
  cursor: default; 
}
.favCheckbox {
  cursor: pointer;
}
</style>