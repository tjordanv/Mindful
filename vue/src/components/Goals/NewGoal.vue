<template>
  <div>
      <form class="newGoal" @submit.prevent="createNewGoal">
        <input type="text" class="newGoalInput" placeholder="Summary" v-model="newGoal.summary" required>
        <textarea class="descriptionInput" placeholder="Description" cols="30" rows="3" v-model="newGoal.description" required></textarea> 
        <label for="units">Units</label>
        <select name="units" v-model="newGoal.units" required>
            <option value="dollars">Dollars</option>
            <option value="lbs">Pounds</option>
            <option value="time">Time</option>
        </select>  
        <label for="movement">Movement</label>
        <select name="movement" v-model="newGoal.movement" required>
            <option value="total up">Total Up</option>
            <option value="total down">Total Down</option>
            <option value="average up">Average Up</option>
            <option value="average down">Average Down</option>
        </select> 
         <!--add v-ifs to display the correct goal input field that corresponds with the units  -->
        <input type="number" class="goalCurrency" placeholder="Goal" v-model="newGoal.goal" v-if="newGoal.units === 'dollars'"  min="0" required>  
        <input type="text" class="goal" placeholder="Goal" v-model="newGoal.goal" v-if="newGoal.units !== 'dollars'" required>  
        <label for="startDate">Start Date</label>
        <input type="Date" class="newGoalDateInput" name="startDate" v-model="newGoal.startDate" required>  
        <label for="endDate">End Date</label>
        <input type="Date" class="newGoalDateInput" name="endDate" v-model="newGoal.endDate" required>  
        <button type="submit">click me</button>
        <button class="back-btn" @click.prevent="navToGoals">Back</button>
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
        this.currentDate = this.$store.state.currentDate; 
    },
    methods: {
        createNewGoal() {
            if (this.newGoal.startDate > this.currentDate) {
                this.newGoal.active = false;
            } else if (this.newGoal.startDate <= this.currentDate) {
                this.newGoal.active = true;
            }
            GoalService.createNewGoal(this.newGoal).then(
                this.$store.commit("INCREMENT_ACTIVE_GOALS"),
                this.$router.push("/goals")
            )
        }, 
        navToGoals() {
            this.$router.push("/goals");
        }
    },
}
</script>

<style>

</style>