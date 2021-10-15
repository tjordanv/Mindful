<template>
  <div id="register" class="text-center">
    <form class="form-register" @submit.prevent="register">
      <h1 class="h3 mb-3 font-weight-normal">Create Account</h1>
      <div class="alert alert-danger" role="alert" v-if="registrationErrors">
        {{ registrationErrorMsg }}
      </div>
      <input type="text" placeholder="First Name" v-model="user.firstName" autofocus required>
      <input type="text" placeholder="Last Name" v-model="user.lastName" required>
      <input type="text" placeholder="Email" v-model="user.email" required>
      <input type="text" placeholder="Phone Number" v-model="user.phone">
      <input
        type="text"
        id="username"
        class="form-control"
        placeholder="Username"
        v-model="user.username"
        required
      />
      <input
        type="password"
        id="password"
        class="form-control"
        placeholder="Password"
        v-model="user.password"
        required
      />
      <input
        type="password"
        id="confirmPassword"
        class="form-control"
        placeholder="Confirm Password"
        v-model="user.confirmPassword"
        required
      />
      <router-link :to="{ name: 'login' }">Have an account?</router-link>
      <button class="btn btn-lg btn-primary btn-block" type="submit">
        Create Account
      </button>
    </form>
    <p v-if="passwordFailed == true">Password must contain at least:
      8 Total Characters
      1 Uppercase Letter
      1 Number
    </p>
  </div>
</template>

<script>
import authService from '../services/AuthService';

export default {
  name: 'register',
  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        username: '',
        password: '',
        confirmPassword: '',
        role: 'user',
      },
      passwordFailed: false,
      registrationErrors: false,
      registrationErrorMsg: 'There were problems registering this user.',
    };
  },
  methods: {
    register() {
      if (this.user.password != this.user.confirmPassword) {
        this.registrationErrors = true;
        this.registrationErrorMsg = 'Password & Confirm Password do not match.';
      } else if (this.passwordRequirements()) {
        authService
          .register(this.user)
          .then((response) => {
            if (response.status == 201) {
              this.$router.push({
                path: '/login',
                query: { registration: 'success' },
              });
            }
          })
          .catch((error) => {
            const response = error.response;
            this.registrationErrors = true;
            if (response.status === 400) {
              this.registrationErrorMsg = 'Bad Request: Validation Errors';
            }
          });
      } else {
        this.passwordFailed = true;
      }
    },
    passwordRequirements() {
      let passStr = this.user.password;
      if (
        passStr.match(/[A-Z]/g) &&
        passStr.match(/[0-9]/g) &&
        passStr.length >= 8
        ) {
        return true;
      }
      return false;
    },
    clearErrors() {
      this.registrationErrors = false;
      this.registrationErrorMsg = 'There were problems registering this user.';
    },
  },
};
</script>

<style></style>
