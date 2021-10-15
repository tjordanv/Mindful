<template>
  <div id="app">
    <div id="nav">
      <router-link v-bind:to="{ name: 'landing' }" v-if="$store.state.token == ''">Home</router-link>&nbsp;|&nbsp;
      <router-link v-bind:to="{name: 'login'}" v-if="$store.state.token == ''">Login</router-link>
      <router-link v-bind:to="{name: 'register'}" v-if="$store.state.token == ''">Register</router-link>
      <router-link v-bind:to="{ name: 'home' }" v-if="$store.state.token != ''">Home</router-link>&nbsp;|&nbsp;
      <router-link v-bind:to="{ name: 'logout' }" v-if="$store.state.token != ''">Logout</router-link>
    </div>
    <router-view />
  </div>
</template>
