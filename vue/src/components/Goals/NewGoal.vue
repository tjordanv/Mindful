<template>
  <div class="container">
      <form class="newGoal">
        <div class="tab" v-show="currentTab == 0">
            <p>Provide a brief summary of your goal, this should be a concise call to action. 
                You can also think of this as a title or header!</p>
            <p><input type="text" class="input" placeholder="Summary" maxlength="25"
            v-model="newGoal.summary" oninput="this.className = 'input'"></p>
            <p>Take a moment to think a bit deeper about this goal and then provide a more detailed 
                description below.  
            </p>
            <p><textarea class="input" placeholder="Description" rows="3" maxlength="800"
            v-model="newGoal.description" oninput="this.className = 'input'"></textarea></p> 
        </div>
        <div class="tab" v-show="currentTab == 1">
            <p>What will you goal be measured in?</p>
            <p><select class="input" name="units" v-model="newGoal.units" oninput="this.className = 'input'">
                <option selected value="">Units</option>
                <option value="dollars">Dollars</option>
                <option value="lbs">Pounds</option>
                <option value="time">Time</option>
            </select></p>  
            <p>What direction is your goal headed?</p>
            <p><select class="input" name="movement" v-model="newGoal.movement" oninput="this.className = 'input'">
                <option selected value="">Goal Direction</option>
                <option value="total up">higher Total</option>
                <option value="total down">Lower Total</option>
                <option value="average up">Higher Average</option>
                <option value="average down">Lower Average</option>
            </select></p> 
            <!--add v-ifs to display the correct goal input field that corresponds with the units  -->
            <p>What is your target?</p>
            <p><input type="time" class="input" placeholder="Target" v-model="newGoal.goal" 
            v-if="newGoal.units === 'time'"  min="0" oninput="this.className = 'input'"></p>  
            <p><input type="number" class="input" placeholder="Target" v-model="newGoal.goal" 
            v-if="newGoal.units !== 'time'" oninput="this.className = 'input'"></p>  
        </div>  
        <div class="tab" v-show="currentTab == 2">
            <p>When will this goal begin?</p>
            <p><input type="Date" class="newGoalDateInput, input" name="startDate" 
            v-model="newGoal.startDate" oninput="this.className = 'newGoalDate, input'"></p>  
            <p>When will this goal end?</p>
            <p><input type="Date" class="newGoalDateInput, input" name="endDate" 
            v-model="newGoal.endDate" oninput="this.className = 'newGoalDate, input'"></p>  
        </div>
        <div class="buttons">
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
    },
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
    width: 500px;
    height: 400px;
    margin-top: 5%;
    grid-area: newGoal;
    justify-self: center;
    background-color: #ffd47d;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}
input[type=text] {
    width: 90%;
}
textarea {
    width: 90%;
}
select {
    width: 30%;
}
input[type=time], input[type=number] {
    width: 30%;
}
.invalid {
    background-color: #ffa8a8;
}
p {
    text-align: center;
}
.progressTracker {
    text-align: center;
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
.buttons {
    align-self: center;
}
button {
    margin: 0 10px;
    cursor: pointer;
    border: none;
    background-color: #4059ad;
    color: #eff2f1;
    border-radius: 10px;
    font-size: 12pt;
    height: 24px;
}
</style>