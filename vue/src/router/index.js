import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/User/Home.vue'
import Login from '../views/User/Login.vue'
import Logout from '../views/User/Logout.vue'
import Register from '../views/User/Register.vue'
import store from '../store/index'
import Landing from "../views/User/Landing.vue"
import Express from "../views/Expressions/Express.vue"
import Reflect from "../views/Reflections/Reflect.vue"
import Goals from "../views/Goals/Goals.vue"
import NewGoal from "../views/Goals/NewGoal.vue"

Vue.use(Router)

/**
 * The Vue Router is used to "direct" the browser to render a specific view component
 * inside of App.vue depending on the URL.
 *
 * It also is used to detect whether or not a route requires the user to have first authenticated.
 * If the user has not yet authenticated (and needs to) they are redirected to /login
 * If they have (or don't need to) they're allowed to go about their way.
 */

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/logout",
      name: "logout",
      component: Logout,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/",
      name: "landing",
      component: Landing,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/goals",
      name: "goals",
      component: Goals,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/express",
      name: "express",
      component: Express,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/reflect",
      name: "reflect",
      component: Reflect,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/new-goal",
      name:"newGoal",
      component: NewGoal,
      meta: {
        requiresAuth: true
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  // Determine if the route requires Authentication
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);

  // If it does and they are not logged in, send the user to "/login"
  if (requiresAuth && store.state.token === '') {
    next("/landing");
  } else {
    // Else let them go to their next destination
    next();
  }
});

export default router;
