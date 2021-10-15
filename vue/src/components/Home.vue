<template>
  <div class="container">
      <div class="greeting">
          <h2>Welcome Back {{$store.state.userInfo.firstName}}!</h2>
      </div>
      <div class="quote">
        <p>"{{quote.text}}"</p>
        <h3>-{{quote.author}}</h3>
        <button v-on:click="info">push me</button>
      </div>
      <div class="weeklyProgress">
          <h2>This Week's Progress</h2>
      </div>
  </div>
</template>

<script>
import AuthService from "../services/AuthService.js";
import QuoteService from "../services/QuoteService.js";

export default {
    components: {},
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

        QuoteService.getQuote().then(
            (response) => {
                this.quote.author = response.data.author;
                this.quote.text = response.data.text;
                console.log(response.data);
            }
        )
    },
    methods: {
        info() {
            console.log(this.$route.path);
            console.log(this.$store.state.userInfo);
        }
    },
}
</script>

<style scoped>
.container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas: 
    "greeting greeting"
    "quote progress";
}
.greeting {
    grid-area: greeting;
    justify-self: center;
}
.quote {
    grid-area: quote;
}
.weeklyProgress {
    grid-area: progress;
}
</style>