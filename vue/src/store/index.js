import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

/*
 * The authorization header is set for axios when you login but what happens when you come back or
 * the page is refreshed. When that happens you need to check for the token in local storage and if it
 * exists you should set the header so that it will be attached to each request
 */
const currentToken = localStorage.getItem('token')
const currentUser = JSON.parse(localStorage.getItem('user'));

if(currentToken != null) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${currentToken}`;
}

export default new Vuex.Store({
  state: {
    token: currentToken || '',
    user: currentUser || {},
    userInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      username: "",
      userId: "",
    },
    currentDate: "",
    activeGoals: "",
    favoriteGoals: "",
  },
  mutations: {
    SET_AUTH_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    },
    SET_USER(state, user) {
      state.user = user;
      localStorage.setItem('user',JSON.stringify(user));
    },
    SET_CURRENT_DATE(state) {
      let date = new Date();
      let today = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
      state.currentDate = today;
    },
    UPDATE_ACTIVE_GOALS(state, activeGoals) {
      state.activeGoals = activeGoals;
    },
    INCREMENT_ACTIVE_GOALS(state) {
      state.activeGoals ++;
    },
    UPDATE_FAVORITE_GOALS(state, favoriteGoals) {
      state.favoriteGoals = 0;
      state.favoriteGoals = favoriteGoals
    },
    INCREMENT_FAVORITE_GOALS(state, movement) {
      state.favoriteGoals += movement;
    },
    SET_USER_INFO(state, userInfo) {
      state.userInfo.firstName = userInfo.firstName;
      state.userInfo.lastName = userInfo.lastName;
      state.userInfo.email = userInfo.email;
      state.userInfo.phone = userInfo.phone;
      state.userInfo.username = userInfo.username;
      state.userInfo.userId = userInfo.id;
    },
    LOGOUT(state) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      state.token = '';
      state.user = {};
      axios.defaults.headers.common = {};
    }
  }
})
