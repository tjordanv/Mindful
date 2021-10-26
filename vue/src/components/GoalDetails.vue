<template>
  <div>
      <h2>goal details</h2>
      <h3>{{goalId}}</h3>
  </div>
</template>

<script>
export default {
    data() {
        return {
            goalId: "",
        }
    },
    created() {
        this.goalId = this.$route.params.goalId;
    }
}
</script>

<style>

</style>