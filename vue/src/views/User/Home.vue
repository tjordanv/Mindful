<template>
  <div class="home">
    <HomeHeader></HomeHeader>
    <Home></Home>
    <HomeFooter></HomeFooter>
  </div>
</template>

<script>
import Home from "../../components/User/Home.vue";
import HomeHeader from "../../components/Headers/HomeHeader.vue";
import HomeFooter from "../../components/Footers/HomeFooter.vue"

export default {
  components: {
    Home,
    HomeHeader,
    HomeFooter,
    }, 
  name: "home",
  data() {
    return {
      
    }
  },
  methods: {
    
  }
};
</script>
