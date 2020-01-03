import firebase from "firebase/app";

export default {
  state: {
    user: null
  },
  mutation: {},
  actions: {
    registerUser: async (context, { email, password }) => {
      const user = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      // eslint-disable-next-line no-console
      console.log(user);
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
