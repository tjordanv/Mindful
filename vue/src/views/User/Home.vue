<template>
  <div class="home">
    <HomeHeader></HomeHeader>
    <Home></Home>
    <Footer></Footer>
  </div>
</template>

<script>
import Home from "../../components/User/Home.vue";
import HomeHeader from "../../components/Headers/HomeHeader.vue";
import Footer from "../../components/Footers/Footer.vue";

export default {
  components: {
    Home,
    HomeHeader,
    Footer,
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
