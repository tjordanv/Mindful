<template>
  <div class="container">
      <div class="goalsContainer" v-bind:class="{moveTable: moveTable, resetTable: resetTable}">
          <table>
            <caption>Your Goals</caption>
            <thead>
              <tr>
                <th>Favorite</th>
                <th>Goal</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Target</th>
                <th>Current Score</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr class="goalRow" v-for="goal in goals" v-bind:key="goal.key">
                <td class="checkboxCell"><input class="favCheckbox" type="checkbox" 
                v-model="goal.favorite" v-on:click="favoriteGoal(goal)"></td>
                <td v-on:click="goToGoal(goal.goalId)">{{goal.summary}}</td>
                <td v-on:click="goToGoal(goal.goalId)">{{goal.startDate}}</td>
                <td v-on:click="goToGoal(goal.goalId)">{{goal.endDate}}</td>
                <td v-on:click="goToGoal(goal.goalId)">{{goal.goal}}</td>
                <td v-on:click="goToGoal(goal.goalId)">{{goal.currentScore}}</td>
                <td class="newScoreCell"><button class="newScoreButton" v-on:click="moveTableAndForm('show'),
                score.goalId = goal.goalId, score.goalMovement = goal.movement, score.goalIndex = goals.indexOf(goal),
                scoreTitle = goal.summary, scoreUnit = goal.units">Add Score</button></td>
              </tr>
            </tbody>
            <tfoot class="newGoalCell">
              <button class="newGoal"><router-link class="newGoalLink" :to="{name: 'newGoal'}" v-if="goals.length < 8">New Goal</router-link></button>
            </tfoot>
          </table>
      </div>
      <div class="scoreContainer" v-bind:class="{showScoreForm : showForm, hideScoreForm : hideForm}">
        <h1 class="formTitle">{{scoreTitle}}</h1>
        <form class="scoreForm" @submit.prevent="saveScore(score), moveTableAndForm('hide')">
          <span>
            <label for="scoreDate">Date:</label>
            <input class="scoreDate" type="date" name="scoreDate" v-model="score.date" required>
          </span>
          <span>
            <label for="score">Score:</label>
            <input class="score" v-if="scoreUnit != 'time'" type="number" name="score" v-model="score.score" required>
            <input class="score" v-if="scoreUnit == 'time'" type="time" name="score" v-model="score.score" required>
          </span>
            <textarea class="notes" v-model="score.note" placeholder="Comments"></textarea>
          <span class="scoreButtons">
            <button type="submit">save</button> |
            <button @click.prevent="moveTableAndForm('hide')">Cancel</button>
          </span>
        </form>
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
      score: {},
      scoreTitle: "",
      scoreUnit: "",
      showForm: false,
      hideForm: true,
      moveTable: false,
      resetTable: false,
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
    saveScore(score) {
      if (this.scoreUnit != 'time') { 
        let newScore = {goalId: score.goalId, date: score.date, score: score.score, notes: score.note};
        ScoreService.createScore(newScore);
      } else {
          let currentTime = score.score.split(":");
          currentTime = currentTime[0] + currentTime[1];
          currentTime = Number(currentTime)
          let newScore = {goalId: score.goalId, date: score.date, score: currentTime, notes: score.note};
          ScoreService.createScore(newScore);
      }

      let goal = this.goals[score.goalIndex]
      if (goal.units != 'time') {
        if (goal.movement == 'total up' || goal.movement == 'total down') {
          goal.currentScore = Number(goal.currentScore) + Number(score.score);
      } else if (goal.movement == 'average up' || goal.movement == 'average down') {
          let tempScore = ( (Number(goal.currentScore) * goal.totalScores) + Number(score.score)) / (goal.totalScores + 1);
          goal.currentScore = tempScore.toFixed(2);
      }
      } else {
          let newTime = score.score.split(":");
          newTime = (newTime[0] * 60) + Number(newTime[1]);
          let minutes = (goal.currentTime + newTime) / (goal.totalScores + 1);
          let amPm = minutes < 720 ? 'AM' : 'PM';
          minutes = [Math.trunc(minutes / 60), Math.trunc(minutes % 60)]
          if (minutes[1] < 10) {
            minutes[1] = "0" + minutes[1].toString()
          }
          goal.currentScore = `${minutes[0]}:${minutes[1]} ${amPm}`
      }
    },
    print(goal) {
      console.log(goal)
    }, 
    moveTableAndForm(direction) {
      if (direction == "show") {
        this.showForm = true;
        this.hideForm = false;
        this.moveTable = true;
      } else {
        this.showForm = false;
        this.hideForm = true;
        this.moveTable = false;
        this.resetTable = true;
      }
    }
  }
}
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas: "goals";
  width: 100%;
  height: 100vh;
  background-color: #eff2f1;
}
.goalsContainer {
  margin-top: 5%;
  grid-area: goals;
  justify-self: center;
  z-index: 3;
  background-color: #eff2f1;
}
table, th, td {
  border: 2px solid #f4b942;
  border-collapse: collapse;
  empty-cells: hide;
}
caption {
  white-space: nowrap;
  font-size: 28pt; 
  color: #f4b942;
  font-weight: bold;
}
td:nth-child(7) {
  border-right: hidden;
  border-bottom: hidden;
}
th:nth-child(7) {
  border-top: hidden;
  border-right: hidden;
  border-bottom: hidden;
}
td {
  height: 50px;
  min-width: 75px;
}
th {
  color: #4059ad;
  font-size: 14pt;
  height: 35px;
  /* font-family: Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif; */
}
.moveTable {
  transform: translateX(-250px);
  transition: 1s;
}
.resetTable {
  transition: 1s;
}
input {
  width: 130px;
}
input[type=checkbox] {
  width: 20px;
}
.newScoreButton {
  cursor: pointer;
  border: none;
  background-color: #4059ad;
  color: #eff2f1;
  border-radius: 10px;
  font-size: 12pt;
  height: 24px;
}
.newGoalCell {
  border-bottom: hidden;
  border-left:hidden;
  border-right: hidden;
}
.newGoal {
  margin-top: 10px;
  cursor: pointer;
  border: none;
  background-color: #4059ad;
  border-radius: 10px;
  height: 24px;
}
.newGoalLink {
  color: white;
  text-decoration: none;
  font-size: 12pt;
}
.scoreContainer  {
  position: absolute;
  justify-self: center;
  justify-content: center;
  margin-top: 5%;
  width: 400px;
  height: 300px;
  z-index: 1;
}
.scoreForm {
  display: flex;
  flex-direction: column;
  border: 2px solid #f4b942;
}
.showScoreForm {
  transform: translateX(300px);
  transition: 1s;
}
.hideScoreForm {
  visibility: hidden;
  transition: 0.5s;
}
.formTitle {
  font-size: 28pt; 
  color: #f4b942;
  /* font-family: Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif; */
  text-align: center;
  margin-top: 0;
  margin-bottom: 0;
}
label {
  font-size: 14pt;
  color: #4059ad;
  display: inline-block;
  width: 100px;
}
span > input {
  width: 50%;
  margin-bottom: 10px;
}
.notes {
  align-self: center;
  width: 75%;
}
.scoreButtons {
  align-self: center;
}
.scoreButtons > button {
  margin: 10px;
  cursor: pointer;
  border: none;
  background-color: #4059ad;
  color: #eff2f1;
  border-radius: 10px;
  font-size: 12pt;
  height: 24px;
}
.goalRow:hover {
  background-color: #f4b942;
  cursor: pointer;
}
.checkboxCell {
  cursor: default; 
  background-color:#eff2f1;
}
.favCheckbox {
  cursor: pointer;
}
.newScoreCell {
  cursor: default; 
  background-color:#eff2f1;
}
</style>