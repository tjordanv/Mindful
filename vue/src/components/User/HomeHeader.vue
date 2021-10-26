<template>
  <div class="container">
    <router-link :to="{name: 'express'}">Express</router-link>
    <router-link :to="{name: 'reflect'}">Reflect</router-link>
    <img class="logo" src="../../pics/brain-left-vs-right.jpg" alt="">
    <router-link :to="{name: 'goals'}">Goals</router-link>
    <router-link :to="{name: 'logout'}">Logout</router-link>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.container{
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.logo{
  max-height: 300px;
  max-width: 400px;
}
</style>