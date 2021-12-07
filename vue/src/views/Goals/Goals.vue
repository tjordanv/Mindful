<template>
  <div>
      <HomeHeader></HomeHeader>
      <Goals></Goals>
      <Footer></Footer>
  </div>
</template>

<script>
import Goals from "../../components/Goals/Goals.vue"
import HomeHeader from "../../components/Headers/HomeHeader.vue"
import Footer from "../../components/Footers/Footer.vue"


export default {
  components: {
    Goals,
    HomeHeader,
    Footer,
  }

}
</script>

<style>

</style>