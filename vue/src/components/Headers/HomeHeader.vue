<template>
  <nav class="container">
    <div class="left">

    <router-link class="link" :to="{name: 'express'}">Express</router-link>
    <router-link v-if="currentPage != '/goals'" class="link" :to="{name: 'goals'}">Goals</router-link>
    </div>
    <router-link class="logo" :to="{name: 'home'}"><img class="logo" src="../../pics/picture.png"></router-link>
    <div class="right">

    <router-link class="link" :to="{name: 'reflect'}">Reflect</router-link>
    <router-link v-if="currentPage != '/community'" class="link" :to="{name: 'community'}">Community</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      currentPage: "",
    }
  },
  created() {
    this.currentPage = this.$route.path;
  }

}
</script>

<style scoped>
.container {
  background-color: #6b9ac4;
    display: grid;
    grid-template-columns: 2fr 1fr 2fr;
    grid-template-areas: 
    "left logo right";
    align-items: center;
}
.left {
  grid-area: left;
  display: flex;
  justify-content: space-around;
}
.logo {
    grid-area: logo;
    height: 100px;
}
.right {
  grid-area: right;
  display: flex;
  justify-content: space-around;
}
.link{
    font-size: 20pt;
    color: white;
}

</style>