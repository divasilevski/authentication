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
      context.commit("setUser", new User(user.user.uid));
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
