// VUE BLOCK
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// BUEFY BLOCK
import Buefy from "buefy";
import "buefy/dist/buefy.css";
Vue.use(Buefy);

// FORTAWESOME BLOCK
import { library } from "@fortawesome/fontawesome-svg-core";

import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fas, fab);

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
Vue.component("font-awesome-icon", FontAwesomeIcon);

// VALIDATION BLOCK
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);

import validation from "./validation.js";
validation(extend);

// FIREBASE BLOCK
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
//import { createValidationCtx } from "vee-validate/dist/types/components/common";
//import "firebase/messaging";
//import "firebase/storage";
// Your web app's Firebase configuration

let firebaseConfig = {
  apiKey: "AIzaSyC0Al5EbPNKh8Wk1cNF5xRJ1aBtJeYD_bg",
  authDomain: "regularization.firebaseapp.com",
  databaseURL: "https://regularization.firebaseio.com",
  projectId: "regularization",
  storageBucket: "regularization.appspot.com",
  messagingSenderId: "279425710785",
  appId: "1:279425710785:web:66d388cfbe9439e478b240",
  measurementId: "G-2WR2QCE1D4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// CREATE VUE
Vue.config.productionTip = false;

let APP;

// Authentication on page reload
firebase.auth().onAuthStateChanged(user => {
  if (!APP) {
    APP = new Vue({
      router,
      store,
      render: h => h(App),
      created() {
        // If user exists
        if (user) this.$store.dispatch("loggedUser", user);
      }
    }).$mount("#app");
  }
});
