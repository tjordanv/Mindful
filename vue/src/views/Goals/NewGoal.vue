<template>
  <div>
      <HomeHeader></HomeHeader>
      <NewGoal></NewGoal>
      <Footer></Footer>
  </div>
</template>

<script>
import NewGoal from "../../components/Goals/NewGoal.vue";
import HomeHeader from "../../components/Headers/HomeHeader.vue";
import Footer from "../../components/Footers/Footer.vue"

export default {
    components: { NewGoal, HomeHeader, Footer },

}
</script>

<style>

</style>