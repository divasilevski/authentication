import firebase from "firebase/app";

export default {
  state: {
    user: null
  },
  mutations: {
    setUser: (state, payload) => (state.user = payload)
  },
  actions: {
    registerUser: async ({ commit }, { name, email, password }) => {
      commit("clearError");
      commit("setLoading", true);

      try {
        // ******************************************************
        // REGISTRATION
        const user = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);

        // SEND name TO DATABASE
        await firebase
          .database()
          .ref(`user_data/${user.user.uid}`)
          .push({ name });

        // Create USER
        commit("setUser", new User(user.user.uid, name));

        // ******************************************************
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
        // ******************************************************
        // LOGIN
        const user = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);

        // LOAD data FROM DATABASE and decryption
        const data = await firebase
          .database()
          .ref(`user_data/${user.user.uid}`)
          .once("value");
        const user_data = dataDecryption(data);

        // Create USER
        commit("setUser", new User(user.user.uid, user_data.name));

        // ******************************************************
        commit("setLoading", false);
      } catch (error) {
        commit("setError", error.message);
        commit("setLoading", false);
        throw error;
      }
    },
    loggedUser: async ({ commit }, payload) => {
      commit("clearError");
      commit("setLoading", true);

      try {
        // ******************************************************
        // LOAD data FROM DATABASE and decryption
        const data = await firebase
          .database()
          .ref(`user_data/${payload.uid}`)
          .once("value");
        const user_data = dataDecryption(data);

        // Load USER
        commit("setUser", new User(payload.uid, user_data.name));

        // ******************************************************
        commit("setLoading", false);
      } catch (error) {
        commit("setError", error.message);
        commit("setLoading", false);
        throw error;
      }
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

/** Класс чисто для удобства */
class User {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

/** Достаем данные из ключей */
function dataDecryption(encrypted_data) {
  return Object.assign(
    ...Object.keys(encrypted_data.val()).map(key => encrypted_data.val()[key])
  );
}
