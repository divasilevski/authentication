import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import slugify from "slugify";

// views
import Home from "../views/home.vue";
import User from "../views/user.vue";
import SignIn from "../views/auth/sign-in.vue";
import SignUp from "../views/auth/sign-up.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "",
    component: Home
  },
  {
    path: "/user",
    name: "/user",
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
    name: "sign-up",
    component: SignUp
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
