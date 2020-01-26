import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "firebase/app";
import store from "../store";

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
    beforeEnter: (to, from, next) => {
      store.state.isAuth ? next() : next("/sign-in");
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

router.beforeEach((to, from, next) => {
  // Reloading page or first try, check isAuth
  if (store.state.isAuth === undefined) {
    firebase.auth().currentUser
      ? (store.state.isAuth = true)
      : (store.state.isAuth = false);
  }
  next();
});

export default router;
