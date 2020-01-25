import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "firebase/app";

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
    name: "user",
    component: User,
    beforeEnter(to, from, next) {
      if (!firebase.auth().currentUser) {
        next("/sign-in");
      } else {
        next();
      }
    }
  },
  {
    path: "/user/settings",
    name: "settings",
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
