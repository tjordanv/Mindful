<template>
  <div class="contain">
    <LandingHeader class="head"></LandingHeader>
    <Landing class="body"></Landing>
    <Footer class="footer"></Footer>
  </div>
</template>

<script>
import LandingHeader from "../../components/Headers/LandingHeader.vue";
import Footer from "../../components/Footers/Footer.vue";
import Landing from "../../components/User/Landing.vue";

export default {
  components: {
    LandingHeader,
    Footer,
    Landing
  }
}
</script>

<style scoped>
.contain {
  display: grid;
  grid-template-columns: auto;
  grid-template-areas: 
  "header"
  "body"
  "footer";
}
.head {
  grid-area: header;
}
.body {
  grid-area: body;
}
.footer {
  grid-area: footer;
}
</style>