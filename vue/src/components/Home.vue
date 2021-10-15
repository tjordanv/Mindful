<template>
  <div>
      <div>
          <h2>Welcome Back {{$store.state.userInfo.firstName}}!</h2>
      </div>
      <h3>{{quote.author}}</h3>
      <p>{{quote.text}}</p>
      <button v-on:click="info">push me</button>
  </div>
</template>

<script>
import AuthService from "../services/AuthService.js";

export default {
    // components: { QuoteService },
    data() {
        return {
            quote: {
                author: "",
                text: "",
            },
        }
    },
    created() {
        AuthService.getUserInfo().then(response => {
              this.$store.commit("SET_USER_INFO", response.data);
              console.log(this.$store.state.userInfo);
        })
    },
    methods: {
        info() {
            console.log(this.$store.state.userInfo);
        }
    },
    // created() {
    //         QuoteService.getQuote().then(
    //             (response) => {
    //                 this.quote.author = response.data.author;
    //                 this.quote.text = response.data.text;
    //                 console.log(response.data);
    //             }
    //         )
    // }
}
</script>

<style>

</style>