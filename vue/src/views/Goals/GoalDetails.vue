<template>
  <div>
      <GoalsHeader></GoalsHeader>
      <GoalDetails></GoalDetails>
  </div>
</template>

<script>
import GoalDetails from "../../components/Goals/GoalDetails.vue";
import GoalsHeader from "../../components/Headers/GoalsHeader.vue"

export default {
    components: {
        GoalDetails,
        GoalsHeader,
    }
}
</script>

<style>

</style>