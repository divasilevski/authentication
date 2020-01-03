export default {
  state: {
    loading: false,
    error: null
  },
  mutations: {
    setLoading: (state, payload) => {
      state.loading = payload;
    },
    setError: (state, payload) => {
      state.error = payload;
    },
    clearError: state => {
      state.error = null;
    }
  },
  actions: {
    setLoading: (context, payload) => {
      context.commit("setLoading", payload);
    },
    setError: (context, payload) => {
      context.commit("setError", payload);
    },
    clearError: context => {
      context.commit("clearError");
    }
  },
  getters: {
    loading: state => state.loading,
    error: state => state.error
  }
};
