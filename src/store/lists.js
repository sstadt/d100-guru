import { createWatcher } from '~/scripts/helpers/firebase.js';

let unsubscribeLists;
let listsRef;

export const state = () => ({
  all: [],
});

export const mutations = {
  ADD(state, list) {
    state.all.push(list);
  },
  UPDATE(state, list) {
    const index = state.all.findIndex((item) => item.id === list.id);
    state.all.splice(index, 1, list);
  },
  REMOVE(state, gameId) {
    const index = state.all.findIndex((item) => item.id === gameId);
    state.all.splice(index, 1);
  },
  CLEAR(state) {
    state.all = [];
  },
};

export const actions = {
  bind({ commit }) {
    listsRef = this.$fire.firestore.collection('lists');
    unsubscribeLists = createWatcher(listsRef, commit);
  },
  create({ dispatch }, list) {
    return new Promise((resolve, reject) => {
      this.$fire.firestore
        .collection('lists')
        .add(list)
        .then(() => resolve())
        .catch((error) => {
          if (error) {
            dispatch('error/handle', error, { root: true });
            reject(error);
          }
        });
    });
  },
  update(_, list) {
    return new Promise((resolve, reject) => {
      const ref = this.$fire.firestore.collection('lists').doc(list.id);
      const updatedlist = {};
      let key;

      for (key in list) {
        if (Object.prototype.hasOwnProperty.call(list, key) && key !== 'id') {
          updatedlist[key] = list[key];
        }
      }

      ref
        .set(updatedlist, { merge: true })
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  },
  remove(_, listId) {
    this.$fire.firestore.collection('lists').doc(listId).delete();
  },
  clear({ commit }) {
    unsubscribeLists();
    commit('CLEAR');
  },
};
