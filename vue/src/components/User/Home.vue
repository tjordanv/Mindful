<template>
  <div class="container">  
    <div class="greeting">
        <h2>Welcome Back, {{$store.state.userInfo.firstName}}!</h2>
    </div>
    <div class="quote">
    <p>"{{quote.text}}"</p>
    <h3>-{{quote.author}}</h3>
    <button v-on:click="info">push me</button>
    </div>
    <div class="progressHeader">
    <h2>This Week's Progress</h2>
    </div>      
    <div class="progressContent">
        <div class="progressCalendar">
            <span class="fa-stack">
                <font-awesome-icon icon="calendar" class="fa-5x fa-stack-1x"/>
                <font-awesome-icon icon="check" class="fa-3x fa-stack-1x" v-if="weeksProgress.sunday.entry"/>
                <font-awesome-icon icon="times" class="fa-3x fa-stack-1x" v-if="weeksProgress.sunday.entry == false"/>
            </span> 
           <span class="fa-stack">
                <font-awesome-icon icon="calendar" class="fa-5x fa-stack-1x"/>
                <font-awesome-icon icon="check" class="fa-3x fa-stack-1x" v-if="weeksProgress.monday.entry"/>
                <font-awesome-icon icon="times" class="fa-3x fa-stack-1x" v-if="weeksProgress.monday.entry == false"/>
            </span>
            <span class="fa-stack">
                <font-awesome-icon icon="calendar" class="fa-5x fa-stack-1x"/>
                <font-awesome-icon icon="check" class="fa-3x fa-stack-1x" v-if="weeksProgress.tuesday.entry"/>
                <font-awesome-icon icon="times" class="fa-3x fa-stack-1x" v-if="weeksProgress.tuesday.entry == false"/>
            </span>
            <span class="fa-stack">
                <font-awesome-icon icon="calendar" class="fa-5x fa-stack-1x"/>
                <font-awesome-icon icon="check" class="fa-3x fa-stack-1x" v-if="weeksProgress.wednesday.entry"/>
                <font-awesome-icon icon="times" class="fa-3x fa-stack-1x" v-if="weeksProgress.wednesday.entry == false"/>
            </span>
            <span class="fa-stack">
                <font-awesome-icon icon="calendar" class="fa-5x fa-stack-1x"/>
                <font-awesome-icon icon="check" class="fa-3x fa-stack-1x" v-if="weeksProgress.thursday.entry"/>
                <font-awesome-icon icon="times" class="fa-3x fa-stack-1x" v-if="weeksProgress.thursday.entry == false"/>
            </span>
            <span class="fa-stack">
                <font-awesome-icon icon="calendar" class="fa-5x fa-stack-1x"/>
                <font-awesome-icon icon="check" class="fa-3x fa-stack-1x" v-if="weeksProgress.friday.entry"/>
                <font-awesome-icon icon="times" class="fa-3x fa-stack-1x" v-if="weeksProgress.friday.entry == false"/>
            </span>
            <span class="fa-stack">
                <font-awesome-icon icon="calendar" class="fa-5x fa-stack-1x"/>
                <font-awesome-icon icon="check" class="fa-3x fa-stack-1x" v-if="weeksProgress.saturday.entry"/>
                <font-awesome-icon icon="times" class="fa-3x fa-stack-1x" v-if="weeksProgress.saturday.entry == false"/>
            </span>
        </div>
    
        <div>
            <table>
            <thead>
              <tr>
                <th>Goal</th>
                <th>End Date</th>
                <th>Target</th>
                <th>Current Score</th>
              </tr>
            </thead>
            <tbody>
              <tr class="goalRow" v-for="goal in goals" v-bind:key="goal.key">
                <td v-on:click="goToGoal(goal.goalId)">{{goal.summary}}</td>
                <td v-on:click="goToGoal(goal.goalId)">{{goal.endDate}}</td>
                <td v-on:click="goToGoal(goal.goalId)">{{goal.goal}}</td>
                <td v-on:click="goToGoal(goal.goalId)">{{goal.currentScore}}</td>
              </tr>
            </tbody>
          </table>
        </div>
    </div>
  </div>
</template>

<script>
import AuthService from "../../services/AuthService.js";
import QuoteService from "../../services/QuoteService.js";
import GoalService from "../../services/GoalService.js";
import ScoreService from "../../services/ScoreService.js";

export default {
    components: {},
    data() {
        return {
            quote: {
                author: "",
                text: "",
            },
            goals: {},
            weeksProgress: {
                sunday: {
                    entry: true
                },
                monday: {
                    entry: true
                },
                tuesday: {
                    entry: false
                },
                wednesday: {
                    entry: true
                },
                thursday: {
                    entry: false
                },
                friday: {
                    entry: true
                },
                saturday: {
                    entry: true
                }
            },
        }
    },
    created() {
        if (this.$store.state.currentDate === "") {
            this.$store.commit("SET_CURRENT_DATE");
        }

        AuthService.getUserInfo().then(response => {
              this.$store.commit("SET_USER_INFO", response.data);
        })

        QuoteService.getQuote().then(
            (response) => {
                this.quote.author = response.data.author;
                this.quote.text = response.data.text;
            }
        )

        GoalService.getAndCheckGoals().then(
            (response) => {
                this.goals = response.data
                this.goals = this.goals.filter(goal => goal.favorite)
                this.$store.commit("UPDATE_FAVORITE_GOALS", this.goals.length);
                console.log(this.$store.state.favoriteGoals);
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
        info() {
            console.log(this.$route.path);
            console.log(this.$store.state.userInfo);
        }
    },
}
</script>

<style scoped>
.container {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-areas: 
    "greeting "
    "quote"
    "progressHeader"
    "progressContent";
}
.greeting {
    grid-area: greeting;
    justify-self: center;
}
.quote {
    grid-area: quote;
    justify-self: center;
}
.progressHeader {
    grid-area: progressHeader;
    justify-self: center;
}
.progressContent {
    grid-area: progressContent;
    display: grid;
    grid-template-columns: 1fr;
}
.progressCalendar {
    grid-area: progressCalendar;
    justify-self: center;
}
span {
    min-width: 100px;
    min-height: 100px;
}
.fa-calendar {
    color:#00b2ca;
}
.fa-check {
    padding-top: 30px;
    color: green;
}
.fa-times {
    padding-top: 30px;
    color: red;
}
</style>