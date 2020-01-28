export default {
  state: {
    user: null
  },
  mutations: {
    setUser: (state, payload) => (state.user = payload),
    setUsername: (state, payload) => (state.user.name = payload)
  },
  actions: {},
  getters: {
    user: state => state.user,
    checkUser: state => state.user !== null
  }
};
