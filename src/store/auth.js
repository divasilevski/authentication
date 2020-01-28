import firebase from "firebase/app";

export default {
  state: {
    isAuth: undefined
  },
  mutations: {
    isAuth: (state, payload) => (state.isAuth = payload)
  },
  actions: {
    signUp: async ({ commit, dispatch }, { name, email, password }) => {
      await dispatch("loadingWrapper", async () => {
        await dispatch("signOut");

        const user = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);

        const currentUser = firebase.auth().currentUser;
        currentUser.sendEmailVerification();

        dispatch("updateData", { name });
        commit("isAuth", true);
        commit("setUser", { id: user.user.uid, name: name });
      });
    },

    signIn: async ({ commit, dispatch }, { email, password }) => {
      await dispatch("loadingWrapper", async () => {
        await dispatch("signOut");

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

        commit("isAuth", true);
        const user_data = await dispatch("loadData");
        commit("setUser", { id: user.user.uid, name: user_data.name });
      });
    },

    signInGoogle: async ({ commit, dispatch }) => {
      await dispatch("loadingWrapper", async () => {
        await dispatch("signOut");

        const user = await firebase
          .auth()
          .signInWithPopup(new firebase.auth.GoogleAuthProvider());

        let name = "";
        try {
          const user_data = await dispatch("loadData");
          name = user_data.name;
        } catch (error) {
          name = user.user.displayName;
          dispatch("updateData", { name: name });
        }

        commit("isAuth", true);
        commit("setUser", { id: user.user.uid, name: name });
      });
    },

    signInGithub: async ({ commit, dispatch }) => {
      await dispatch("loadingWrapper", async () => {
        await dispatch("signOut");

        const user = await firebase
          .auth()
          .signInWithPopup(new firebase.auth.GithubAuthProvider());

        let name = "";
        try {
          const user_data = await dispatch("loadData");
          name = user_data.name;
        } catch (error) {
          name = user.additionalUserInfo.username;
          dispatch("updateData", { name: name });
        }

        commit("isAuth", true);
        commit("setUser", { id: user.user.uid, name: name });
      });
    },

    loggedUser: async ({ commit, dispatch }, user) => {
      commit("isAuth", true);
      const user_data = await dispatch("loadData");
      commit("setUser", { id: user.uid, name: user_data.name });
    },

    signOut: async ({ commit }) => {
      commit("isAuth", false);
      commit("setUser", null);
      await firebase.auth().signOut();
    },

    changePassword: async (undefined, new_password) => {
      const user = firebase.auth().currentUser;
      await user.updatePassword(new_password);
    },

    deleteAccount: ({ commit, dispatch }) => {
      commit("isAuth", false);
      commit("setUser", null);

      const user = firebase.auth().currentUser;
      user.delete();
      dispatch("removeData");
    },

    resetPassword: async ({ dispatch }, email) => {
      await dispatch("loadingWrapper", async () => {
        await firebase.auth().sendPasswordResetEmail(email);
      });
    }
  },
  getters: {
    isAuth: state => state.isAuth
  }
};
