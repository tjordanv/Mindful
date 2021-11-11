<template>
    <nav class="container">
        <router-link class="link" :to="{name: 'home'}">Home</router-link>
        <img src="../../pics/picture.png">
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
    height: 175px;
}
.link{
    font-size: 20pt;
    color: white;
}

</style>