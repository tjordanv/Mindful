<template>
  <div>
    <nav>
      <router-link v-bind:to="{name: 'login'}" v-if="$store.state.token == false">Login</router-link>
      <router-link v-bind:to="{name: 'register'}" v-if="$store.state.token == false">Register</router-link>
    </nav>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>