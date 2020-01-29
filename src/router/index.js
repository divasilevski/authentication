import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "firebase/app";
import store from "../store";

// views
import Home from "../views/Home.vue";
import Settings from "../views/auth/settings.vue";
import PasswordReset from "../views/auth/password-reset.vue";
import User from "../views/User.vue";
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
    path: "/settings",
    name: "settings",
    component: Settings
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
  },
  {
    path: "/password-reset",
    name: "password-reset",
    component: PasswordReset
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  // Ловим идентификацию до первой закрузки страницы,
  // Нельзя словить при создании приложения, так как несуществует store
  if (store.state.isAuth === undefined) {
    firebase.auth().currentUser
      ? (store.state.isAuth = true)
      : (store.state.isAuth = false);
  }
  next();
});

export default router;
