export const state = () => ({
  isLoading: false,
  message: '',
});

export const mutations = {
  START_LOADING(state) {
    state.isLoading = true;
  },
  STOP_LOADING(state) {
    state.isLoading = false;
    state.message = '';
  },
  SET_MESSAGE(state, message) {
    state.message = message;
  },
};

export const actions = {
  start({ commit }, message) {
    commit('START_LOADING');
    if (message && message.length > 0) commit('SET_MESSAGE', message);
  },
  message({ commit }, message) {
    commit('SET_MESSAGE', message);
  },
  stop({ commit }) {
    commit('STOP_LOADING');
  },
};
