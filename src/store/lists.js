import { createWatcher } from '~/scripts/helpers/firebase.js';

let unsubscribeLists;

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
    const ref = this.$fireStore.collection('lists');
    unsubscribeLists = createWatcher(ref, commit);
  },
  create(_, list) {
    this.$firestore.collection('lists').add(list);
  },
  update(_, list) {
    const ref = this.$fireStore.collection('lists').doc(list.id);
    const updatedlist = {};
    let key;

    for (key in list) {
      if (Object.prototype.hasOwnProperty.call(list, key) && key !== 'id') {
        updatedlist[key] = list[key];
      }
    }

    ref.set(updatedlist, { merge: true });
  },
  remove(_, listId) {
    this.$fireStore.collection('lists').doc(listId).delete();
  },
  clear({ commit }) {
    unsubscribeLists();
    commit('CLEAR');
  },
};
