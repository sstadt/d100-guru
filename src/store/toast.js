const timeout = 5000;

export const state = () => ({
  messages: [],
});

export const mutations = {
  ADD_MESSAGE(state, { text, type, label, callback }) {
    const id = new Date().getTime();

    state.messages.push({ id, text, type, label, callback });
    setTimeout(() => state.messages.splice(0, 1), timeout);
  },
};

export const actions = {
  init({ commit }) {
    document.addEventListener('application-updated', () => {
      commit('ADD_MESSAGE', {
        text: 'Update Available',
        label: 'Reload',
        callback: () => {
          window.location.reload(true);
        },
      });
    });
  },
  send({ commit }, text) {
    commit('ADD_MESSAGE', { text });
  },
  success({ commit }, text) {
    commit('ADD_MESSAGE', { text, type: 'success' });
  },
};
