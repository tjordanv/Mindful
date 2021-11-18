<template>
  <div>
    <nav>
      <router-link v-bind:to="{name: 'logout'}" v-if="$store.state.token != ''">Logout</router-link>
      <router-link v-bind:to="{name: 'login'}" v-if="$store.state.token == ''">Login</router-link> | 
      <router-link v-bind:to="{name: 'register'}" v-if="$store.state.token == ''">Register</router-link>
      <router-link v-bind:to="{name: 'home'}" v-if="$store.state.token != ''">Home</router-link>
    </nav>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>