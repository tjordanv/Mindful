<template>
  <div>
      <router-link v-bind:to="{name: 'login'}" v-if="$store.state.token == ''">Login</router-link>
      <router-link v-bind:to="{name: 'register'}" v-if="$store.state.token == ''">Register</router-link>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>