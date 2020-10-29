import { createWatcher } from '~/scripts/helpers/firebase.js';

let unsubscribeOwnedLists;

const state = {
  all: [],
};

const mutations = {
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

const actions = {
  populate({ rootState, commit }) {
    const userId = rootState.user.currentUser.uid;
    const ownedListsRef = rootState.listsCollection.where(
      'created_by',
      '==',
      userId
    );

    unsubscribeOwnedLists = createWatcher(ownedListsRef, commit);
  },
  create({ rootState }, list) {
    rootState.listsCollection.add(list);
  },
  update({ rootState }, list) {
    const listRef = rootState.listsCollection.doc(list.id);
    const updatedlist = {};
    let key;

    for (key in list) {
      if (Object.prototype.hasOwnProperty.call(list, key) && key !== 'id') {
        updatedlist[key] = list[key];
      }
    }

    listRef.set(updatedlist, { merge: true });
  },
  remove({ rootState }, listId) {
    rootState.listsCollection.doc(listId).delete();
  },
  clear({ commit }) {
    unsubscribeOwnedLists();
    commit('CLEAR');
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
