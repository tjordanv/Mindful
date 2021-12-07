<template>
  <nav class="container">
    <router-link class="link" :to="{name: 'express'}">Express</router-link>
    <router-link class="link" :to="{name: 'goals'}">Goals</router-link>
    <img class="logo" src="../../pics/picture.png" alt="">
    <router-link class="link" :to="{name: 'reflect'}">Reflect</router-link>
    <router-link class="link" :to="{name: 'community'}">Community</router-link>
  </nav>
</template>

<script>
export default {

}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #6b9ac4;
}
.logo {
    height: 100px;
}
.link{
    font-size: 20pt;
    color: white;
}
p {
    color: #6b9ac4;
}
</style>