import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import slugify from "slugify";

// views
import Home from "../views/Home.vue";
import User from "../views/User.vue";
import SignIn from "../views/authentication/SignIn.vue";
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
        ? next(`/user/${slugify(store.getters.user.name, { lower: true })}`)
        : next("/sign-in");
    }
  },
  {
    path: `/user/:user_name`,
    name: "user",
    component: User
  },
  {
    path: "/sign-in",
    name: "sign-in",
    component: SignIn
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
