<template>
  <div class="home">
    <HomeHeader></HomeHeader>
    <Home></Home>
  </div>
</template>

<script>
import Home from "../../components/Home.vue";
import HomeHeader from "../../components/HomeHeader.vue";

export default {
  components: {
    Home,
    HomeHeader,
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
