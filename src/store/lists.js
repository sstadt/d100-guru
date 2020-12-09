import { createWatcher } from '~/scripts/helpers/firebase.js';

export const state = () => ({
  all: [],
  unsubscribe: () => {},
});

export const getters = {
  published: (state) => {
    return state.all.filter((list) => list.published);
  },
  owned: (state, _, rootState) => {
    return state.all.filter(
      (list) => list.author === rootState.user.currentUser.uid
    );
  },
};

export const mutations = {
  ADD(state, list) {
    // NOTE: prevent owned and published from being duplicated
    if (!state.all.find((l) => l.id === list.id)) {
      state.all.push(list);
    }
  },
  UPDATE(state, list) {
    const index = state.all.findIndex((item) => item.id === list.id);
    state.all.splice(index, 1, list);
  },
  REMOVE(state, gameId) {
    const index = state.all.findIndex((item) => item.id === gameId);
    state.all.splice(index, 1);
  },
  SET_UNSUBSCRIBE(state, unsubscribe) {
    state.unsubscribe = () => unsubscribe();
  },
  UNSUBSCRIBE(state) {
    state.unsubscribe();
    state.unsubscribe = () => {};
    state.all = state.all.filter((list) => list.published);
  },
};

export const actions = {
  bindPublished({ commit }) {
    const publishedListsRef = this.$fire.firestore
      .collection('lists')
      .where('published', '==', true);

    // TODO: this will need to be adjusted for lazyloading
    //       but for now, we don't care about the unsubscribe
    //       - unsubscribe/update as necessary for search
    createWatcher(publishedListsRef, commit);
  },
  bindOwned({ rootState, commit }) {
    const ownedListsRef = this.$fire.firestore
      .collection('lists')
      .where('author', '==', rootState.user.currentUser.uid);
    const unsubscribeOwnedLists = createWatcher(ownedListsRef, commit);

    commit('SET_UNSUBSCRIBE', unsubscribeOwnedLists);
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
  delete(_, listId) {
    this.$fire.firestore.collection('lists').doc(listId).delete();
  },
  unbindOwned({ commit }) {
    commit('UNSUBSCRIBE');
  },
};
