import Vue from "vue";
import Vuex from "vuex";

import user from "./user";
import loading from "./loading";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { input_save: "" },
  mutations: {},
  actions: {},
  modules: {
    user,
    loading
  }
});
