<template>
  <nav class="container">
    <router-link class="link" v-if="$store.state.token == ''" :to="{name: 'login'}">Login</router-link>
    <router-link class="link" v-if="$store.state.token != ''" :to="{name: 'home'}">Home</router-link>
    <img class="logo" src="../../pics/picture.png" alt="">
    <router-link class="link" v-if="$store.state.token == ''" :to="{name: 'register'}">Register</router-link>
    <router-link class="link" v-if="$store.state.token != ''" :to="{name: 'logout'}">Logout</router-link>
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