<template>
  <div>
      <GoalsHeader></GoalsHeader>
      <Goals></Goals>
  </div>
</template>

<script>
import Goals from "../../components/Goals/Goals.vue"
import GoalsHeader from "../../components/Headers/GoalsHeader.vue"

export default {
  components: {
    Goals,
    GoalsHeader,
  }

}
</script>

<style>

</style>