<template>
  <div>
      <HomeHeader></HomeHeader>
      <GoalDetails></GoalDetails>
      <Footer></Footer>
  </div>
</template>

<script>
import GoalDetails from "../../components/Goals/GoalDetails.vue";
import HomeHeader from "../../components/Headers/HomeHeader.vue"
import Footer from "../../components/Footers/Footer.vue"

export default {
    components: {
        GoalDetails,
        HomeHeader,
        Footer,
    }
}
</script>

<style>

</style>