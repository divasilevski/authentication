import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth";
import loading from "./loading";
import database from "./database";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    loading,
    database
  }
});
