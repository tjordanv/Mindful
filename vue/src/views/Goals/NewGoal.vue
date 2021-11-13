<template>
  <div>
      <GoalsHeader></GoalsHeader>
      <NewGoal></NewGoal>
  </div>
</template>

<script>
import NewGoal from "../../components/Goals/NewGoal.vue";
import GoalsHeader from "../../components/Goals/GoalsHeader.vue";

export default {
    components: { NewGoal, GoalsHeader },

}
</script>

<style>

</style>