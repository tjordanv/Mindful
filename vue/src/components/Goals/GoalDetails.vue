<template>
  <div class="background">
    <div class="container">
        <div class="topCenterFlex">
            <h1 class="goalSummary">{{goal.summary}}</h1>
            <h3 class="goalDescription">{{goal.description}}</h3>
            <div class="buttons">
                <button v-on:click="delay()">Add New Score</button>
                <button v-on:click="print()">Modify Goal</button>
                <button v-on:click="endGoal()">End Goal</button>
            </div>
        </div>
        <div class="tableContainer">
            <table>
                <!-- <caption class="scoreTableHeader">Score Log</caption> -->
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
        </div>
        <div class="progressInformation">
            <h2>Started: {{goal.startDate}}</h2> 
            <h2>Ending: {{goal.endDate}}</h2>
            <h2 class="score">Current Progress: {{currentScore}} / {{goal.goal}}</h2>
            <h2 class="scorePercentage">{{scorePercent}}% Completed</h2>
        </div>
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
import TotalScoreService from "../../services/TotalScoreService.js"

export default {
    data() {
        return {
            goalId: "",
            goal: {},
            scores: [],
            currentScore: 0,
            test: {}
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
            }
        )
        TotalScoreService.getScoreByGoalId(this.goalId).then(
            (response) => {
                this.currentScore = response.data[0].score
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
    },
    methods: {
        endGoal() {
            if(confirm("are you sure?")) {
                GoalService.terminateGoal(this.goalId);
                this.$store.commit("INCREMENT_ACTIVE_GOALS", -1)
                this.$router.push("/goals");
            }
        },
        print() {
            let v = 're'
            if (!this.test.score) {
                v = 2 == 2;
                console.log(v);
            }
        },
        delay() {
            alert("before setTimeout");
            let c = 3455;
            setTimeout(function(){
                alert("I am setTimeout");
                c = false
                console.log(c)
            },3000); //delay is in milliseconds 

            alert("after setTimeout");
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
    "topCenterFlex progressInformation"
    "scoresTable analytics";
    justify-items: center;
    background-color: #eff2f1;
}
.topCenterFlex {
    grid-area: topCenterFlex;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50vw;
}
.goalDescription {
    text-align: center;
    border: 2px solid #ffd47d;
}
.buttons {
    display: flex;
    width: 25vw;
    justify-content: space-around;
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
.progressInformation {
    grid-area: progressInformation;
}
.analytics {
    grid-area: analytics;
}
.tableContainer {
    grid-area: scoresTable;
    overflow-y: auto;
    height: 250px;
    border: 1px solid sandybrown;
    margin: 15px 0 15px 0;
    background-color: #eff2f1;
}
table {
    border-collapse: collapse;
}
thead th {
    padding:0 25px 5px 0;
    top: 0;
    position: sticky;
    background-color:#ffd47d;
    text-decoration: underline;
}
td {
    padding:0 25px 5px 0;
    border-bottom: 1px solid royalblue;
}
td {
    max-width: 300px;
}
</style>