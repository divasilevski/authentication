import firebase from "firebase/app";

export default {
  state: {
    isAuth: undefined,
    user: null
  },
  mutations: {
    setUser: (state, payload) => (state.user = payload),
    setUsername: (state, payload) => (state.user.name = payload),
    isAuth: (state, payload) => (state.isAuth = payload)
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
        commit("isAuth", true);
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
    signOut: async ({ commit }) => {
      // Выходим из аккаунта
      commit("isAuth", false);

      await firebase.auth().signOut();
      commit("setUser", null);
    },
    changePassword: async (undefined, new_password) => {
      // Меняем пароль текущего пользователя на новый
      const user = firebase.auth().currentUser;
      await user.updatePassword(new_password);
    },
    deleteAccount: async ({ commit, getters }) => {
      // Выходим из аккаунта
      commit("isAuth", false);

      // Удаляем регистрацию
      const user = firebase.auth().currentUser;
      user.delete();

      // Очищаем базу данных и обнуляем пользователя
      firebase
        .database()
        .ref(`user_data/${getters.user.id}`)
        .remove();
      commit("setUser", null);
    }
  },
  getters: {
    user: state => state.user,
    checkUser: state => state.user !== null,
    isAuth: state => state.isAuth
  }
};

/** Class for convenience */
class User {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}
