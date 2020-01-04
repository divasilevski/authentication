import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

// views
import Home from "../views/Home.vue";
import User from "../views/User.vue";
import Login from "../views/authentication/Login.vue";
import SignUp from "../views/authentication/SignUp.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/user",
    name: "/user",
    component: null,
    beforeEnter(to, from, next) {
      store.getters.checkUser
        ? next(`/user/${store.getters.user.name}`)
        : next("/login");
    }
  },
  {
    path: `/user/:user_name`,
    name: "user",
    component: User
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/sign-up",
    name: "signup",
    component: SignUp
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
