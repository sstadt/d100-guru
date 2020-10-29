import Vue from 'vue';
import Vuex from 'vuex';

// game data
import user from './modules/user';
import lists from './modules/lists';

// ui automation
import loading from './modules/loading';
import toast from './modules/toast';
import installer from './modules/installer';

import { auth, db, storage } from '~/scripts/config/firebase.js';

Vue.use(Vuex);

const state = {
  auth,
  storage,
  usersCollection: db.collection('lists'),
};

export default new Vuex.Store({
  state,
  modules: {
    user,
    lists,
    loading,
    toast,
    installer,
  },
});
