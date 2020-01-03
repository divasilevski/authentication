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
      // Очищаем поле ошибки
      commit("clearError");

      // Включаем загрузку
      commit("setLoading", true);

      try {
        const user = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
        commit("setUser", new User(user.user.uid, name));
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

class User {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}
