import { isIos, isInStandaloneMode } from '~/scripts/helpers/environment.js';

const INSTALLER_DISMISSED_KEY = 'd100g_pwa_installer_dismissed';

const state = {
  showInstaller: false,
};

const mutations = {
  SHOW_INSTALLER(state) {
    state.showInstaller = true;
  },
  HIDE_INSTALLER(state) {
    state.showInstaller = false;
  },
};

const actions = {
  init({ commit }) {
    if (
      isIos() &&
      !isInStandaloneMode() &&
      localStorage[INSTALLER_DISMISSED_KEY] !== 'true'
    ) {
      commit('SHOW_INSTALLER');
      setTimeout(() => commit('HIDE_INSTALLER'), 30000);
    }
  },
  dismiss({ commit }) {
    localStorage[INSTALLER_DISMISSED_KEY] = 'true';
    commit('HIDE_INSTALLER');
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
