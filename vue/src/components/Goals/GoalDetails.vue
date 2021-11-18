<template>
  <div class="background">
    <div class="container">
        <div class="topCenterFlex">
            <h1 class="goalSummary">{{goal.summary}}</h1>
            <h3 class="goalDescription">{{goal.description}}</h3>
            <div class="buttons">
                <button>Add New Score</button>
                <button>Modify Goal</button>
                <button>Delete Goal</button>
            </div>
            <h2 class="score">{{currentScore}} / {{goal.goal}}</h2>
            <h2 class="scorePercentage">{{scorePercent}}% Completed</h2>
        </div>
        <table class="scoresTable">
            <caption class="scoreTableHeader">Score Log</caption>
                <thead>
                    <tr class="headers">
                        <th>Date</th>
                        <th>Score</th>
                        <th>Notes</th>
                    </tr>
                </thead>
            <tbody>
                <tr class="scores" v-for="score in scores" v-bind:key="score.key">
                    <td>{{score.date}}</td>
                    <td>{{score.score}}</td>
                    <td>{{score.notes}}</td>
                </tr>
            </tbody>
        </table>
        <div class="analytics">
            <h3>below is only placeholder text. will eventually be an analytics table</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                    sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                    est laborum.</p>
        </div>
    </div>
    </div>
</template>

<script>
import ScoreService from "../../services/ScoreService.js";
import GoalService from "../../services/GoalService.js";

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
    computed: {
        scorePercent() {
            if (this.goal.movement == "average up" || this.goal.movement == "total up") {
                let result = Math.trunc((this.currentScore / this.goal.goal) * 100);
                return result != "Infinity" ? result : 0;
            } else if (this.goal.movement == "average down" || this.goal.movement == "total down") {
                let result = Math.trunc((this.goal.goal / this.currentScore) * 100) 
                return result != "Infinity" ? result : 0;
            }
            return "other"
        }
    }
}
</script>

<style scoped>
.background {
    background-color: #eff2f1;
}
.container {
    display: grid;
    width: auto;
    height: auto;
    grid-template-columns: 1fr 1fr;
    grid-template-areas: 
    "topCenterFlex topCenterFlex"
    "scoresTable analytics";
    justify-items: center;
    background-color: #ffd47d;
}

.topCenterFlex {
    grid-area: topCenterFlex;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70vw;
}
.goalSummary {

}
.goalDescription {
    text-align: center;
    border: 2px solid greenyellow;
}
.buttons {
    display: flex;
    width: 25vw;
    justify-content: space-around;
}
.score {
  
}
.scorePercentage {

}
.scoresTable {
    grid-area: scoresTable;
    border: 2px solid salmon;
}
.scoreTableHeader {
    font-size: 25pt;
    text-align: center;
}
.headers{
    font-size: 18pt;
}
.scores {
    font-size:16pt;
}
.analytics {
    grid-area: analytics;
}

tbody {
    display:block;
    overflow: scroll;
    max-height:450px;
    width:100%;
}
thead tr {
    display: block;
}
tr, td{
    border: 2px royalblue solid;
    border-collapse: collapse;
}
td {
    max-width: 200px;
}
</style>