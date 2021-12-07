<template>
  <div class="contain">
    <LandingHeader class="head"></LandingHeader>
    <Landing class="body"></Landing>
    <LandingFooter class="footer"></LandingFooter>
  </div>
</template>

<script>
import LandingHeader from "../../components/Headers/LandingHeader.vue";
import LandingFooter from "../../components/Footers/LandingFooter.vue";
import Landing from "../../components/User/Landing.vue";

export default {
  components: {
    LandingHeader,
    LandingFooter,
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