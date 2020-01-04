export default {
  state: {
    loading: false,
    error: null
  },
  mutations: {
    setLoading: (state, payload) => (state.loading = payload),
    setError: (state, payload) => (state.error = payload),
    clearError: state => (state.error = null)
  },
  actions: {
    setLoading: ({ commit }, payload) => commit("setLoading", payload),
    setError: ({ commit }, payload) => commit("setError", payload),
    clearError: ({ commit }) => commit("clearError")
  },
  getters: {
    loading: state => state.loading,
    error: state => state.error
  }
};

/** Стандартная обёртка для асинхронных (actions)
method: async ({ commit }, payload) => {
  commit("clearError");
  commit("setLoading", true);

  try {
    // await methods
    // other methods
    
    commit("setLoading", false);
  } catch (error) {
    commit("setError", error.message);
    commit("setLoading", false);
    throw error;
  }
}
*/
