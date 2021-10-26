<template>
  <div>
      <GoalDetailsHeader></GoalDetailsHeader>
      <GoalDetails></GoalDetails>
  </div>
</template>

<script>
import GoalDetails from "../../components/Goals/GoalDetails.vue";
import GoalDetailsHeader from "../../components/Goals/GoalDetailsHeader.vue"

export default {
    components: {
        GoalDetails,
        GoalDetailsHeader,
    }
}
</script>

<style>

</style>