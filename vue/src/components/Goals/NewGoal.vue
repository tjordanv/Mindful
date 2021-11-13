<template>
  <div class="container">
      <form class="newGoal">
        <div class="tab" v-show="currentTab == 0">
            <p>Provide a brief summary of your goal, this should be a concise call to action. 
                You can also think of this as a title or header!</p>
            <p><input type="text" class="input" placeholder="Summary" maxlength="25"
            v-model="newGoal.summary" oninput="this.className = 'newGoalSum, input'"></p>
            <p>Take a moment to think a bit deeper about this goal and then provide a more detailed 
                description below. Why are you persuing this goal and what impact will it have on 
                you? How will you reach this goal and hold yourself accountable along the way? Thoughts
                like these must be considered in order to set effective goals.  
            </p>
            <p><textarea class="input" placeholder="Description" rows="5" maxlength="800"
            v-model="newGoal.description" oninput="this.className = 'input'"></textarea></p> 
        </div>
        <div class="tab" v-show="currentTab == 1">
            <label for="units">Units</label>
            <select class="input" name="units" v-model="newGoal.units" oninput="this.className = 'input'">
                <option value="dollars">Dollars</option>
                <option value="lbs">Pounds</option>
                <option value="time">Time</option>
            </select>  
            <label for="movement">Movement</label>
            <select class="input" name="movement" v-model="newGoal.movement" oninput="this.className = 'input'">
                <option value="total up">Total Up</option>
                <option value="total down">Total Down</option>
                <option value="average up">Average Up</option>
                <option value="average down">Average Down</option>
            </select> 
            <!--add v-ifs to display the correct goal input field that corresponds with the units  -->
            <input type="number" class="goalCurrency, input" placeholder="Goal" v-model="newGoal.goal" v-if="newGoal.units === 'dollars'"  min="0" oninput="this.className = 'goalCurrecny, input'">  
            <input type="text" class="goal, input" placeholder="Goal" v-model="newGoal.goal" v-if="newGoal.units !== 'dollars'" oninput="this.className = 'goal, input'">  
        </div>  
        <div class="tab" v-show="currentTab == 2">
            <label for="startDate">Start Date</label>
            <input type="Date" class="newGoalDateInput, input" name="startDate" v-model="newGoal.startDate" oninput="this.className = 'newGoalDate, input'">  
            <label for="endDate">End Date</label>
            <input type="Date" class="newGoalDateInput, input" name="endDate" v-model="newGoal.endDate" oninput="this.className = 'newGoalDate, input'">  
        </div>
        <div>
            <button class="NextBtn" @click.prevent="tabNav(1)" v-if="currentTab != 2">Next</button>
            <button class="submitBtn" @click.prevent="createNewGoal()" v-if="currentTab == 2">Save</button>
            <button class="BackBtn" @click.prevent="tabNav(-1)" v-if="currentTab != 0">Back</button>
            <button class="CancelBtn" @click.prevent="navToGoals" v-if="currentTab == 0">Cancel</button>
        </div>
        <div class="progressTracker">
            <span class="step"></span>
            <span class="step"></span>
            <span class="step"></span>
        </div>
      </form>
  </div>
</template>

<script>
import AuthService from "../../services/AuthService.js";
import GoalService from "../../services/GoalService.js"

export default {
    data() {
        return {
            newGoal: {
                userId: "",
                summary: "", 
                description: "", 
                goal: "", 
                movement: "", 
                units: "", 
                startDate: "", 
                endDate: "", 
                active: ""
            },
            currentDate: "",
            currentTab: 0,
        }
    },
    created() {
        if (this.$store.state.activeGoals == "" ||this.$store.state.activeGoals == 8) {
            this.$router.push("/goals");
        }
        if (this.$store.state.userInfo.username === "") {
            AuthService.getUserInfo().then(response => {
              this.$store.commit("SET_USER_INFO", response.data);
              this.newGoal.userId = this.$store.state.userInfo.userId;
        }) 
        } else {
            this.newGoal.userId = this.$store.state.userInfo.userId;
        }
        if (this.$store.state.currentDate === "") {
            this.$store.commit("SET_CURRENT_DATE");
        }
        
    },
    mounted() {
        let steps = document.getElementsByClassName("progressTracker");
        steps[0].firstElementChild.classList.add("active");
    } ,
    methods: {
        createNewGoal() {
            if (this.validateForm()) {
                if (this.newGoal.startDate > this.currentDate) {
                    this.newGoal.active = false;
            } else if (this.newGoal.startDate <= this.currentDate) {
                this.newGoal.active = true;
            }
            // TODO: redirect user to goalDetails page rather than goals page.
            GoalService.createNewGoal(this.newGoal).then(
                this.$store.commit("INCREMENT_ACTIVE_GOALS"),
                this.$router.push("/goals")
            )
        }
        }, 
        navToGoals() {
            this.$router.push("/goals");
        },
        tabNav(n) {
            if (n == 1 && !this.validateForm()) {
                return false;
            } else {
                this.currentTab += n;
                this.stepIndicator(this.currentTab);
            }
        },
        validateForm() {
            let valid = true;
            let tabs = document.getElementsByClassName("tab");
            let tabInputs = tabs[this.currentTab].getElementsByClassName("input");
            for (let i = 0; i < tabInputs.length; i ++) {
                if (tabInputs[i].value == "") {
                    tabInputs[i].classList.add("invalid");
                    valid = false;
                } 
            }

            if (valid) {
                document.getElementsByClassName("step")[this.currentTab].className += " complete";
            }

            return valid;
        },
        stepIndicator(n) {
            let steps = document.getElementsByClassName("step");
            for (let i = 0; i < steps.length; i++) {
                steps[i].classList.remove("active");
                // steps[i].className = steps[i].className.replace(" active", "");
            }
            steps[n].classList.add("active");
        }
    },
}
</script>

<style scoped>
.container {
display: grid;
  grid-template-columns: 1fr;
  grid-template-areas: "newGoal";
  width: 100%;
  height: 100vh;
  background-color: #eff2f1;
}
.newGoal {
    width: 400px;
    margin-top: 5%;
    grid-area: newGoal;
    justify-self: center;
    background-color: #f4b942;
}
input[type=text] {
    width: 90%;
}
textarea {
    width: 90%;
}
.invalid {
    background-color: #ffdddd;
}
p {
    text-align: center;
}
.progressTracker {
    text-align: center;
    margin-top: 40px;
}
.step {
    height: 20px;
    width: 20px;
    margin: 0 3px;
    background-color: white;
    border: none;
    border-radius: 50%;
    display: inline-block;
    opacity: 0.5;
}
.active {
    opacity: 1;
}
.step.complete {
    background-color: green;
}
</style>