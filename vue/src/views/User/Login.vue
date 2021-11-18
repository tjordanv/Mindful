<template>
  <div id="login" class="text-center">
    <form class="form-signin">
      <h1 class="header">Login</h1>
      <div class="inputs">
        <div class="user-info">
          <div id="username">
            <label>Username</label>
            <input
              type="text"
              class="input"
              v-model="user.username"
              autofocus
              oninput="this.className = 'input'"
            />
          </div>
          <div id="password">
            <label>Password</label>
            <input
              type="password"
              class="input"
              v-model="user.password"
              oninput="this.className = 'input'"
            />
          </div>
        </div>
        <div class="buttons">
          <br /><button class="btn" @click.prevent="validateForm() && login()">Log In</button>
          <br /><button class="btn" @click.prevent="navToLanding()">Cancel</button>
        </div>
      </div>
      <span class="registerLink"
        >Don't have an account?
        <router-link :to="{ name: 'register' }"
          >Click here to register</router-link
        >
      </span>
    </form>
    <div class="alerts">
      <div 
        class="alert alert-danger"
        role="alert"
        v-if="invalidCredentials"
      >
        Invalid username or password
      </div>
      <div
        class="alert alert-success"
        role="alert"
        v-if="this.$route.query.registration"
      >
        Thank you for registering<br />
        Please sign in
      </div>
    </div>
  </div>
</template>

<script>
import authService from "../../services/AuthService";

export default {
  name: "login",
  components: {},
  data() {
    return {
      user: {
        username: "",
        password: ""
      },
      invalidCredentials: false
    };
  },
  methods: {
    login() {
      authService
        .login(this.user)
        .then(response => {
          if (response.status == 200) {
            this.$store.commit("SET_AUTH_TOKEN", response.data.token);
            this.$store.commit("SET_USER", response.data.user);
            this.$router.push("/home");
          }
        })
        .catch(error => {
          const response = error.response;

          if (response.status === 401) {
            this.invalidCredentials = true;
          }
        });
    },
    validateForm() {
      let valid = true;
      let form = document.getElementsByClassName("form-signin");
      let formInputs = form[0].getElementsByClassName("input");
      for (let i = 0; i < 2; i ++) {
        if (formInputs[i].value == "") {
          formInputs[i].classList.add("invalid");
          valid = false;
        } 
      }
      return valid;
    },
    navToLanding() {
        this.$router.push("/");
    },
  }
};
</script>

<style scoped>
.text-center {
  display: grid;
  height: 100vh;
  grid-template-columns: 1fr;
  grid-template-areas: "form"
  "alerts";
  justify-items: center;
  align-items: center;
  background-color: #eff2f1;
}

.form-signin {
  display: grid;
  grid-area: form;
  grid-template-columns: 1fr;
  grid-template-areas:
    "header"
    "inputs"
    "loginLink";
  width: 320px;
  height: auto;
  background-color: #ffd47d;
  border-radius: 10px;
  padding: 10px;
  color: #eff2f1;
  box-shadow: 5px 5px 5px #4059ad;
}

.inputs {
  grid-area: inputs;
  display: flex;
  flex-wrap: wrap;
  min-height: 250px;
  max-width: 350px;
  justify-content: center;
}

.user-info {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  min-height: 100px;
  margin: 0 0 0 30px;
}

.form-signin input {
  height: 25px;
  min-width: 250px;
  font-size: 14px;
  border-radius: 4px;
  border: none;
}

.form-signin input:focus {
  height: 21px;
  border: 2px solid #4059ad;
  box-shadow: 0 0 10px #4059ad;
  outline: none;
}

.btn {
  cursor: pointer;
  min-height: 35px;
  width: 100px;
  font-size: 16px;
  border-radius: 15px;
  border: none;
  color: #eff2f1;
  background-color: #4059ad;
  font-weight: bold;
  box-shadow: 2px 3px 2px #eff2f1;
}

.registerLink {
  grid-area: loginLink;
  justify-self: center;
  font-size: 14px;
}

.buttons {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 320px;
  height: 80px;
}

.header {
  text-decoration: underline;
  grid-area: header;
  justify-self: center;
}
.alerts {
  grid-area: alerts;
  align-self: flex-start;
  margin: 0;
}
.alert {
  font-size: 14px;
  text-align: center;
}

a:link {
  color: #bcf7e5;
}
a:visited {
  color: #8dbee9;
}
a:hover {
  color: #4059ad;
}
.alert-danger{
  color: rgb(206, 0, 0);
  border: 1px solid red;
  box-shadow: 0 0 10px red;
  padding:0 10px;
}
.alert-success{
  color: green;
  border: 1px solid green;
  box-shadow: 0 0 10px green;
  padding:0 10px;
}
label{
  font-size: 14pt;
  color: #eff2f1;
}
.invalid {
  background-color: #ffa8a8;
}
</style>