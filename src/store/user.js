import firebase from "firebase/app";

export default {
  state: {
    user: null
  },
  mutations: {
    setUser: (state, payload) => (state.user = payload)
  },
  actions: {
    registerUser: async ({ commit }, { email, password }) => {
      commit("clearError");
      commit("setLoading", true);

      try {
        const user = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
        commit("setUser", new User(user.user.uid));
        commit("setLoading", false);
      } catch (error) {
        commit("setError", error.message);
        commit("setLoading", false);
        throw error;
      }
    },
    loginUser: async ({ commit }, { email, password }) => {
      commit("clearError");
      commit("setLoading", true);

      try {
        const user = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);
        commit("setUser", new User(user.user.uid));
        commit("setLoading", false);
      } catch (error) {
        commit("setError", error.message);
        commit("setLoading", false);
        throw error;
      }
    },
    loggedUser: ({ commit }, payload) => {
      commit("setUser", new User(payload.uid));
    },
    logoutUser: ({ commit }) => {
      firebase.auth().signOut();
      commit("setUser", null);
    }
  },
  getters: {
    user: state => state.user,
    checkUser: state => state.user !== null
  }
};

class User {
  constructor(id) {
    this.id = id;
  }
}
