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

        const currentUser = firebase.auth().currentUser;
        currentUser.sendEmailVerification();

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

        if (firebase.auth().currentUser.emailVerified) {
          // eslint-disable-next-line no-console
          console.log("EMAIL VERIFIED");
        } else {
          // eslint-disable-next-line no-console
          console.log("EMAIL NOT VERIFIED");
        }

        // LOAD data FROM DATABASE and decryption
        const data = await firebase
          .database()
          .ref(`user_data/${user.user.uid}`)
          .once("value");

        const user_data = data.val();

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

        let user_name = "";

        // SEND name TO DATABASE
        await firebase
          .database()
          .ref(`user_data/${user.user.uid}`)
          .once("value")
          .then(data => {
            // If name already set
            user_name = data.val().name;
          })
          .catch(() => {
            // If name not set
            user_name = user.user.displayName;
            firebase
              .database()
              .ref(`user_data/${user.user.uid}`)
              .set({ name: user.user.displayName });
          });

        // Create USER
        commit("setUser", new User(user.user.uid, user_name));

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
        const user_data = data.val();

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
        const user = firebase.auth().currentUser;
        user.delete();

        firebase
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
    },
    changeUserName: async ({ commit, getters }, user_name) => {
      commit("clearError");
      commit("setLoading", true);

      try {
        // ******************************************************
        await firebase
          .database()
          .ref(`user_data/${getters.user.id}`)
          .update({ name: user_name });

        getters.user.name = user_name;

        // ******************************************************
        commit("setLoading", false);
      } catch (error) {
        commit("setError", error.message);
        commit("setLoading", false);
        throw error;
      }
    },
    changePassword: async ({ commit }, new_password) => {
      commit("clearError");
      commit("setLoading", true);

      try {
        // ******************************************************
        const user = firebase.auth().currentUser;
        await user.updatePassword(new_password);

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
