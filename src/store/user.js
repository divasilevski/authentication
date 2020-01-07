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
          .set({ name });

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

        const user_data = data.val(); // if method push: dataDecryption(data);

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
    loginGoogle: async ({ commit }) => {
      commit("clearError");
      commit("setLoading", true);

      try {
        // ******************************************************
        // GOOGLE LOGIN
        const user = await firebase
          .auth()
          .signInWithPopup(new firebase.auth.GoogleAuthProvider());

        // SEND name TO DATABASE
        await firebase
          .database()
          .ref(`user_data/${user.user.uid}`)
          .set({ name: user.user.displayName });

        // Create USER
        commit("setUser", new User(user.user.uid, user.user.displayName));

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
    logoutUser: async ({ commit }) => {
      commit("clearError");
      commit("setLoading", true);

      try {
        // ******************************************************
        await firebase.auth().signOut();
        commit("setUser", null);

        // ******************************************************
        commit("setLoading", false);
      } catch (error) {
        commit("setError", error.message);
        commit("setLoading", false);
        throw error;
      }
    },
    deleteUser: async ({ commit, getters }) => {
      commit("clearError");
      commit("setLoading", true);

      try {
        // ******************************************************
        const user = await firebase.auth().currentUser;
        user.delete();

        await firebase
          .database()
          .ref(`user_data/${getters.user.id}`)
          .remove();

        commit("setUser", null);

        // ******************************************************
        commit("setLoading", false);
      } catch (error) {
        commit("setError", error.message);
        commit("setLoading", false);
        throw error;
      }
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
