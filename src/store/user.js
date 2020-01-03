import firebase from "firebase/app";

export default {
  state: {
    user: null
  },
  mutations: {
    setUser: (state, payload) => {
      state.user = payload;
    }
  },
  actions: {
    registerUser: async (context, { email, password }) => {
      const user = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      context.commit("setUser", user.user.uid);
    }
  },
  getters: {
    user(state) {
      return state.user;
    },
    checkUser(state) {
      return state.user !== null;
    }
  }
};
