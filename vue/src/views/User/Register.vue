<template>
  <div id="register" class="container">
    <router-link class="back" :to="{name: 'landing'}">&lt; Back to Home Page</router-link>
    <form class="form-register">
      <h1 class="header">Create Account</h1>
      <div class="tab" v-show="currentTab == 0">
        <div>
          <label>First Name</label>
          <input type="text" class="input" v-model="user.firstName"
          autofocus oninput="this.className = 'input'">
        </div>
        <span class="spacer"></span>
        <div>
          <label>Last Name</label>
          <input type="text" class="input" v-model="user.lastName"
          oninput="this.className = 'input'">
        </div>
      </div>
      <div class="tab" v-show="currentTab == 1">
        <div>
          <label>Email</label>
          <input type="email" class="input" oninput="this.className = 'input'" 
          v-model="user.email">
        </div>
        <span class="spacer"></span>
        <div>
          <label>Phone Number</label>
          <input type="number" class="input" oninput="this.className = 'input'"
          v-model="user.phone">
        </div>
      </div>
      <div class="tab" v-show="currentTab == 2">
        <div>
          <label>City   </label>
          <input type="text" class="input" oninput="this.className = 'input'" 
          v-model="user.city">
        </div>
        <span class="spacer"></span>
        <div>
          <label>State   </label>
          <select type="" class="input" oninput="this.className = 'input'"
          v-model="user.state">
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="DC">District Of Columbia</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
          </select>
        </div>
      </div>
      <div class="tab" v-show="currentTab == 3">
        <div>
          <label>Personal Mission Statement</label>
          <textarea class="input" cols="30" rows="5" oninput="this.className = 'input'"
          v-model="user.missionStatement" maxlength="250" 
          placeholder="This should be a short decree which clearly describes your values and goals."></textarea>
        </div>
      </div>
      <div class="tab" id="lastTab" v-show="currentTab == 4">
        <div><label>Username</label>
        <input
          type="text"
          id="username"
          class="input"
          oninput="this.className = 'input'"
          v-model="user.username"
        /></div>
        <span class="spacer"></span>
        <div><label>Password</label>
        <input
          type="password"
          class="input"
          oninput="this.className = 'input'"
          v-model="user.password"
        /></div>
        <span class="spacer"></span>
        <div><label>Confirm Password</label>
        <input
          type="password"
          class="input"
          oninput="this.className = 'input'"
          v-model="user.confirmPassword"
        /></div>
      </div>
        <div class="alert" v-show="registrationErrors">
          {{ registrationErrorMsg }}
      </div>
      <div class="buttons">
          <button class="NextBtn" @click.prevent="tabNav(1)" v-if="currentTab != 4">Next</button>
          <button class="saveBtn" @click.prevent="register()" v-if="currentTab == 4">Save</button>
          <span class="spacer"></span>
          <button class="BackBtn" @click.prevent="tabNav(-1)" v-if="currentTab != 0">Back</button>
      </div>
      <div class="progressTracker">
        <span class="step"></span>
        <span class="step"></span>
        <span class="step"></span>
        <span class="step"></span>
        <span class="step"></span>
      </div>
      <span class="loginLink">
        Have an account?
        <router-link :to="{ name: 'login' }">Click here to login</router-link>
      </span>
    </form>
  </div>
</template>

<script>
import authService from '../../services/AuthService';

export default {
  name: 'register',
  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        missionStatement: "",
        city: "",
        state: "",
        email: "",
        phone: "",
        username: '',
        password: '',
        confirmPassword: '',
        role: 'USER',
      },
      passwordFailed: false,
      registrationErrors: false,
      registrationErrorMsg: '',
      currentTab: 0,
    };
  },
  mounted() {
        let steps = document.getElementsByClassName("progressTracker");
        steps[0].firstElementChild.classList.add("active");
  },
  methods: {
    register() {
      if (this.validateForm(true)) {
        if (this.user.password != this.user.confirmPassword) {
          this.registrationErrors = true;
          this.registrationErrorMsg = 'Passwords must match.';
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
              this.registrationErrorMsg = 'There were problems registering this user.';
            }
            else {
              this.registrationErrorMsg = 'Username already taken.';
            }
          });
      } else {
          this.registrationErrors = true;
          this.registrationErrorMsg = "Password must contain at least " +
          "8 Characters, 1 Uppercase, 1 Number";
      }
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
    tabNav(n) {
      if (n == 1 && !this.validateForm(false)) {
          return false;
      } else {
          this.currentTab += n;
          this.stepIndicator(this.currentTab);
      }
    },
    validateForm(register) {
      let valid = true;
      let tabs = document.getElementsByClassName("tab");
      let tabInputs = tabs[this.currentTab].getElementsByClassName("input");
      for (let i = 0; i < tabInputs.length; i ++) {
          if (tabInputs[i].value == "") {
              tabInputs[i].classList.add("invalid");
              valid = false;
          } 
      }

      if (valid && !register) {
          document.getElementsByClassName("step")[this.currentTab].className += " complete";
      }

      return valid;
    },
    stepIndicator(n) {
      let steps = document.getElementsByClassName("step");
      for (let i = 0; i < steps.length; i++) {
          steps[i].classList.remove("active");
          // steps[i].className = steps[i].className.replace(" active", "");
      }
      steps[n].classList.add("active");
    },
    navToLanding() {
        this.$router.push("/landing");
    },
  },
};
</script>

<style scoped>
.container {
  display: grid;
  height: 100vh;
  grid-template-columns: 1fr;
  grid-template-areas: "back"
  "form";
  justify-items: center;
  align-items: center;
  background-color: #eff2f1;
  font-family: Arial, Helvetica, sans-serif;
  text-shadow: 0.5px 0.5px gray;
}
.back {
  grid-area: back;
  align-self: end;
  margin: 0 175px 10px 0;
}
.form-register {
  display: grid;
  grid-area: form;
  grid-template-columns: 1fr;
  grid-template-areas:
    "header"
    "inputs"
    "alert"
    "buttons"
    "tracker"
    "loginLink";
  width: 320px;
  height: 450px;
  background-color: #ffd47d;
  border-radius: 10px;
  padding: 10px;
  color: #eff2f1;
  border: 1px #4059ad solid;
  box-shadow: 2px 2px 8px 4px #4059ad;
  align-self: start;
}

.tab {
  grid-area: inputs;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  min-height: 100px;
  margin: 50px 0 0 30px;
}

.header {
  text-decoration: underline;
  color: #eff2f1;
  grid-area: header;
  justify-self: center;
  cursor: default;
  margin-bottom: 0px
}

#lastTab {
  margin-top: 0;
}

.form-register input, .form-register select {
  height: 25px;
  min-width: 255px;
  font-size: 14px;
  border-radius: 5px;
  border: none;
  margin-top: 5px;
}
.form-register textarea{
  resize: none;
  font-size: 14px;
  border-radius: 5px;
  margin-top: 5px;
}
.form-register input:focus {
  height: 21px;
  border: 2px solid #4059ad;
  box-shadow: 0 0 10px #4059ad;
  outline: none;
}
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
label {
  font-size: 15pt;
  color: #eff2f1;
}

.alert {
  grid-area: alert;
  color: red;
  border: 1px solid red;
  box-shadow: 0 0 10px 1px red;
  padding:0 10px;
  border-radius: 15px;
  align-self: center;
  max-width: 265px;
  font-size: 15px;
  text-align: center;
  color: #eff2f1;
  justify-self: center;
  margin-top: 10px;
}

.buttons {
  grid-area: buttons;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 320px;
  height: 80px;
  margin-top: 15px;
}
button {
  cursor: pointer;
  min-height: 35px;
  width: 100px;
  font-size: 16px;
  border-radius: 15px;
  border: none;
  color: #eff2f1;
  background-color: #4059ad;
  font-weight: bold;
}
button:hover {
  box-shadow: 0px 0px 8px 4px #eff2f1;
}

.progressTracker {
  text-align: center;
  align-self: end;
  grid-area: tracker;
  margin: 0;
}
.step {
  height: 20px;
  width: 20px;
  margin: 0 3px;
  background-color: white;
  border: none;
  border-radius: 50%;
  display: inline-block;
  opacity: 0.5;
}
.active {
  opacity: 1;
}
.step.complete {
  background-color: green;
}

.loginLink {
  grid-area: loginLink;
  justify-self: center;
  font-size: 15px;
  align-self: end;
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

.invalid {
  background-color: #ffa8a8;
}
.spacer {
      margin: 5px;
}
</style>