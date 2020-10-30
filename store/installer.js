import { isIos, isInStandaloneMode } from '~/scripts/helpers/environment.js';

const INSTALLER_DISMISSED_KEY = 'd100g_pwa_installer_dismissed';

export const state = () => ({
  showInstaller: false,
});

export const mutations = {
  SHOW_INSTALLER(state) {
    state.showInstaller = true;
  },
  HIDE_INSTALLER(state) {
    state.showInstaller = false;
  },
};

export const actions = {
  init({ commit }) {
    const installerDismissed = localStorage[INSTALLER_DISMISSED_KEY] !== 'true';

    if (isIos() && !isInStandaloneMode() && installerDismissed) {
      commit('SHOW_INSTALLER');
      setTimeout(() => commit('HIDE_INSTALLER'), 30000);
    }
  },
  dismiss({ commit }) {
    localStorage[INSTALLER_DISMISSED_KEY] = 'true';
    commit('HIDE_INSTALLER');
  },
};

// export default {
//   namespaced: true,
//   state,
//   mutations,
//   actions,
// };
