// VUE BLOCK
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// BUEFY BLOCK
import Buefy from "buefy";
import "buefy/dist/buefy.css";
Vue.use(Buefy);

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
//import "firebase/messaging";
//import "firebase/storage";

// CREATE VUE
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    // Your web app's Firebase configuration
    var firebaseConfig = {
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

    // Authentication on page reload
    firebase.auth().onAuthStateChanged(user => {
      // If user exists
      if (user) this.$store.dispatch("loggedUser", user);
    });
  }
}).$mount("#app");
