<template>
  <div class="container">
      <div class="goalsContainer" v-bind:class="{moveTable: moveTable, resetTable: !moveTable}">
          <div class="firstGoal" v-if="goals.length == 0">
            <h1>Let's get it tracking!</h1>
            <button class="newGoal"><router-link class="newGoalLink" :to="{name: 'newGoal'}" v-if="goals.length < 8">New Goal</router-link></button>
          </div>
          <table v-if="goals.length != 0">
            <caption>Your Goals</caption>
            <thead>
              <tr>
                <th></th>
                <th>Pin</th>
                <th>Goal</th>
                <th>Target</th>
                <th>Score</th>
                <th>Days Remaining</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr class="goalRow" v-for="goal in goals" v-bind:key="goal.key">
                <td><font-awesome-icon icon="angle-up" class="icon fa-3x"></font-awesome-icon></td>
                <td class="checkboxCell"><input class="favCheckbox" type="checkbox" 
                v-model="goal.favorite" v-on:click="favoriteGoal(goal)"></td>
                <td v-on:click="goToGoal(goal.goalId)">{{goal.summary}}</td>
                <td v-on:click="goToGoal(goal.goalId)">{{goal.goal}}</td>
                <td v-if="goal.units != 'dollars'" v-on:click="goToGoal(goal.goalId)">{{goal.currentScore}}</td>
                <td v-if="goal.units == 'dollars'" v-on:click="goToGoal(goal.goalId)">$ {{goal.currentScore}}</td>
                <td v-on:click="goToGoal(goal.goalId)" ><span v-bind:class="{finalDays: goal.finalDays}">{{goal.daysRemaining}}</span></td>
                <td class="newScoreCell"><button class="newScoreButton" v-on:click="moveTableAndForm(goal), print()">Add Score</button></td>
              </tr>
            </tbody>
            <tfoot class="newGoalCell">
              <tr>
                <td colspan="8">
                  <button class="newGoal"><router-link class="newGoalLink" :to="{name: 'newGoal'}" v-if="goals.length < 8">New Goal</router-link></button>
                </td>
              </tr>
            </tfoot>
          </table>
      </div>
      <div class="scoreContainer" v-bind:class="{showScoreForm : showForm, hideScoreForm : !showForm}">
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
            <textarea class="notes" v-model="score.note" placeholder="Comments (Optional)"></textarea>
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
import TotalScoreService from '../../services/TotalScoreService.js';

export default {
  data() {
    return {
      goals: [],
      totalScore: {
        goalId: "",
        scoreCount: "",
        score: ""
      },
      currentDate: "",
      score: {},
      scoreTitle: "",
      scoreUnit: "",
      showForm: false,
      moveTable: false,
    }
  },
  computed: {
    daysRemaining: function() {
      let daysArr = [];
      this.goals.forEach(goal => {
        let milliseconds = goal.startDate.getTime() - goal.endDate.getTime();
        milliseconds = milliseconds / (1000 * 60 * 60 * 24);
        daysArr.push(milliseconds);
      })
      return daysArr;
    }
  },
  created() {
    // setting current date
    if (this.$store.state.currentDate === "") {
      this.$store.commit("SET_CURRENT_DATE");
    }

    this.currentDate = this.$store.state.currentDate; 

    this.loadActiveGoals();
  },
  beforeMount() {
    this.loadActiveGoals();

  },
  methods: {
    print() {
      console.log(this.daysRemaining)
    },
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
        // TODO: place a constrain that limits users to choosing 3 favorite goals.
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
      // committing new score to the database
      // reformating the date from default bc the inherent timestamp reformatting returns incorrect day
      let date = score.date.split('-');
      let trueDate = new Date(`${date[1]}-${date[2]}-${date[0]}`)
      if (this.scoreUnit != 'time') { 
        let newScore = {goalId: score.goalId, date: trueDate, score: score.score, notes: score.note};
        ScoreService.createScore(newScore);
      } else {
          // formats time value into an integer value to fit database column requirements
          let currentTime = score.score.split(":");
          currentTime = currentTime[0] + currentTime[1];
          currentTime = Number(currentTime)
          let newScore = {goalId: score.goalId, date: score.date, score: currentTime, notes: score.note};
          ScoreService.createScore(newScore);
      }
      // updating non-time total score in database in accordance with goal movement.
      let goal = this.goals[score.goalIndex]
      if (goal.units != 'time') {
        if (goal.movement == 'total up' || goal.movement == 'total down') {
          goal.currentScore = Number(goal.currentScore) + Number(score.score);
          this.totalScore.score = goal.currentScore;
      } else if (goal.movement == 'average up' || goal.movement == 'average down') {
          let tempScore = ((Number(goal.currentScore) * goal.scoreCount) + Number(score.score)) / (goal.scoreCount + 1);
          goal.currentScore = Number(tempScore.toFixed(2));
          this.totalScore.score = goal.currentScore;
      }
      }
      // formatting time values to update total score in database. assuming these 
      // time values are always averaging up or down.
      else {
          let newTime = score.score.split(":");
          newTime = (newTime[0] * 60) + Number(newTime[1]);
          let minutes = ((goal.currentTime * goal.scoreCount) + newTime) / (goal.scoreCount + 1);
          let amPm = minutes < 720 ? 'AM' : 'PM';
          this.totalScore.score = minutes;
          minutes = [Math.trunc(minutes / 60), Math.trunc(minutes % 60)]
          if (minutes[1] < 10) {
            minutes[1] = "0" + minutes[1].toString()
          }
          goal.currentScore = `${minutes[0]}:${minutes[1]} ${amPm}`
      }
      this.totalScore.goalId = score.goalId;
      TotalScoreService.updateTotalScore(this.totalScore);
    },
    loadActiveGoals() {
      // validate current and future goals by date
      GoalService.getAndCheckGoals().then(
        (response) => {
          this.goals = response.data
          this.$store.commit("UPDATE_ACTIVE_GOALS", this.goals.length);
          // Updating the favorite goals count. This needs work, may not be necessary
          if (this.$store.state.favoriteGoals === "") {
            this.$store.commit("UPDATE_FAVORITE_GOALS", this.goals.length);
            this.goals.forEach(goal => {
            if (goal.favorite != true) {
              this.$store.commit("INCREMENT_FAVORITE_GOALS", -1);
            }
          })
        }
        }).finally(() => {
        // updating current score
        this.goals.forEach(
          goal => TotalScoreService.getScoreByGoalId(goal.goalId).then(
            (response) => {
              goal.currentScore = response.data[0].score;
              goal.scoreCount = response.data[0].scoreCount;
              // formatting score of time based goals
              if (goal.units == 'time') {
                goal.currentTime = goal.currentScore;
                let amPm = goal.currentScore < 720 ? 'AM' : 'PM';
                let minutes = Math.trunc(goal.currentScore % 60);
                let hours = Math.trunc(goal.currentScore / 60);
                goal.currentScore = `${hours}:${minutes} ${amPm}`;
              }
            }
          )
        )
        // calculating DaysRemaining
        this.goals.forEach(
          goal => {
            let end = new Date(goal.endDate);
            let today = new Date();
            let milliseconds = end.getTime() - today.getTime();
            goal.daysRemaining = Math.round((milliseconds / (1000 * 60 * 60 * 24)) + 1) ;
          
            if (goal.daysRemaining <= 3) {
              goal.finalDays = true;
            }
            if (goal.daysRemaining == 0) {
              goal.daysRemaining = "Last Day";
            }
          }
        )

        // sorting goals by end date or days remaining 
        this.goals.sort((a, b) => {
          if (a.daysRemaining < b.daysRemaining) {
            return -1;
          } else if (a.daysRemaining > b.daysRemaining) {
            return 1;
          }
          return 0;
        })
        })
    }, 
    moveTableAndForm(goal) {
      let iteration = 1;
        if (!this.score.goalId) {
            this.score.goalId = goal.goalId;
            this.score.goalMovement = goal.movement;
            this.score.goalIndex = this.goals.indexOf(goal);
            this.scoreTitle = goal.summary;
            this.scoreUnit = goal.units;
            this.showForm = true;
            this.moveTable = true;
            iteration --;
        } else {
            this.showForm = false;
            this.moveTable = false;
            if (this.score.goalId == goal.goalId || goal == "hide") {
              setTimeout(() => {
                this.score = {}
              }, 200);
              iteration --;
            } else {            
              iteration ++;  
            }
      }
      if (iteration == 2) {
        setTimeout(() => {
          this.score = {};
          this.score.goalId = goal.goalId;
          this.score.goalMovement = goal.movement;
          this.score.goalIndex = this.goals.indexOf(goal);
          this.scoreTitle = goal.summary;
          this.scoreUnit = goal.units;
          this.showForm = true;
          this.moveTable = true;
        }, 600);
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
  height: 80vh;
  background-color: #eff2f1;
  text-shadow: 0.5px 0.5px gray;
}
.firstGoal {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background-color: #ffd47d;
  border: 1px #4059ad solid;
  border-radius: 10px;
  padding: 10px;
  color: #eff2f1;
  box-shadow: 2px 2px 8px 4px #4059ad;
  height: 225px;
  width: 350px;

}
.goalsContainer {
  margin-top: 5%;
  grid-area: goals;
  justify-self: center;
  z-index: 3;
  background-color: #eff2f1;
}
table, th, td {
  border: 2px solid #ffd47d;
  border-collapse: collapse;
  empty-cells: hide;
}
td, th {
  padding-left: 6px;
  padding-right: 6px;
}
caption {
  white-space: nowrap;
  font-size: 28pt; 
  color: #ffd47d;
  font-weight: bold;
}
td:nth-child(7) {
  border-right: hidden;
  border-bottom: hidden;
}
td:nth-child(1) {
  border-left: hidden;
  border-bottom: hidden;
  cursor: default; 
  background-color:#eff2f1;
}
.icon {
  color: green;
}
th:nth-child(7) {
  border-top: hidden;
  border-right: hidden;
  border-bottom: hidden;
}
th:nth-child(1) {
  border-top: hidden;
  border-left: hidden;
  border-bottom: hidden;
}
td {
  height: 50px;
  min-width: 75px;
  text-align: center;
}
th {
  color: #4059ad;
  font-size: 14pt;
  height: 35px;
}
.finalDays {
  display: block;
  background-color: #e9e623;
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
.newGoalCell {
  border-bottom: hidden;
  border-left:hidden;
  border-right: hidden;
  text-align: center;
}
.newGoalCell td {
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
.firstGoal .newGoal {
  height: 40px;
}
.newGoalLink {
  color: white;
  text-decoration: none;
  font-size: 12pt;
}
.firstGoal .newGoalLink {
  font-size: 18pt;
}
button:hover {
    box-shadow: 0px 0px 8px 4px #ffd47d;
}
.firstGoal .newGoal:hover {
    box-shadow: 0px 0px 8px 4px #eff2f1;
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
  border: 2px solid #ffd47d;
}
.showScoreForm {
  transform: translateX(360px);
  transition: 1s;
}
.hideScoreForm {
  visibility: hidden;
  transition: 0.8s;
}
.formTitle {
  font-size: 28pt; 
  color: #ffd47d;
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
  background-color: #ffd47d;
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
.newScoreButton {
  cursor: pointer;
  border: none;
  background-color: #4059ad;
  color: #eff2f1;
  border-radius: 10px;
  font-size: 12pt;
  height: 24px;
  margin: 0 0 0 10px;
}
</style>