const state = {
  isLoading: false,
  message: '',
};

const mutations = {
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

const actions = {
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

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
