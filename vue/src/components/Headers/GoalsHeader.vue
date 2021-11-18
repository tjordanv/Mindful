<template>
    <nav class="container">
        <p v-if="$route.path == '/goals'">spacerspa</p>
        <router-link class="link" v-if="$route.path != '/goals'" :to="{name: 'goals'}">Goals</router-link>
        <router-link class="link" :to="{name: 'home'}"><img src="../../pics/picture.png"></router-link>
        <router-link class="link" :to="{name: 'logout'}">Logout</router-link>
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
img {
    height: 125px;
}
.link{
    font-size: 20pt;
    color: white;
}
p {
    color: #6b9ac4;
}
</style>