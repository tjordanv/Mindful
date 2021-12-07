<template>
  <div>
      <GoalsHeader></GoalsHeader>
      <Goals></Goals>
      <Footer></Footer>
  </div>
</template>

<script>
import Goals from "../../components/Goals/Goals.vue"
import GoalsHeader from "../../components/Headers/GoalsHeader.vue"
import Footer from "../../components/Footers/Footer.vue"


export default {
  components: {
    Goals,
    GoalsHeader,
    Footer,
  }

}
</script>

<style>

</style>