<template>
  <nav class="container">
    <router-link class="link" :to="{name: 'contact'}">Contact</router-link>
    <router-link class="link" v-if="$store.state.token != ''" :to="{name: 'logout'}">Logout</router-link>
    <router-link class="link" :to="{name: 'about'}">About</router-link>
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

.link {
  font-size: 16pt;
  color: white;
}
</style>