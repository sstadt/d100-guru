import { createWatcher } from '~/scripts/helpers/firebase.js';

const RESULTS_PER_PAGE = 50;
let lastDoc = null;

export const state = () => ({
  all: [],
  query: null,
  unsubscribeOwned: () => {},
  unsubscribePublished: [],
  endOfPublished: false,
});

export const getters = {
  published: (state, _, rootState) => {
    return state.all.filter((list) => {
      return list.published && list.author !== rootState.user.currentUser.uid;
    });
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
    const game = state.all[index];

    // NOTE: don't remove owned lists - they are watched separately
    if (
      state.rootState.user.currentUser &&
      state.rootState.user.currentUser.uid !== game.author
    ) {
      state.all.splice(index, 1);
    }
  },
  SET_QUERY(state, query) {
    state.query = query;
  },
  SET_UNSUBSCRIBE_OWNED(state, unsubscribe) {
    state.unsubscribeOwned = () => unsubscribe();
  },
  ADD_UNSUBSCRIBE(state, unsubscribe) {
    state.unsubscribePublished.push(unsubscribe);
  },
  UNSUBSCRIBE_OWNED(state) {
    state.unsubscribeOwned();
    state.unsubscribeOwned = () => {};
    state.all = state.all.filter((list) => list.published);
  },
  UNSUBSCRIBE_PUBLISHED(state, rootState) {
    state.query = null;
    state.unsubscribePublished.forEach((unsubscribe) => () => unsubscribe());
    state.unsubscribePublished = [];
    state.all = state.all.filter(
      (list) => list.author === rootState.user.currentUser.uid
    );
    state.endOfPublished = false;
  },
  END_OF_PUBLISHED(state) {
    state.endOfPublished = true;
  },
};

export const actions = {
  handleUpdate({ commit }, change) {
    switch (change.type) {
      case 'added':
        commit('ADD', { ...change.doc.data(), id: change.doc.id });
        lastDoc = change.doc;
        break;
      case 'modified':
        commit('UPDATE', { ...change.doc.data(), id: change.doc.id });
        break;
      case 'removed':
        commit('REMOVE', change.doc.id);
        break;
    }
  },
  bindOwned({ rootState, commit, dispatch }) {
    const query = this.$fire.firestore
      .collection('lists')
      .where('author', '==', rootState.user.currentUser.uid);
    const unsubscribeOwnedLists = createWatcher(query, (change) =>
      dispatch('handleUpdate', change)
    );

    commit('SET_UNSUBSCRIBE_OWNED', unsubscribeOwnedLists);
  },
  bindPublished({ commit, dispatch }) {
    const query = this.$fire.firestore
      .collection('lists')
      .where('published', '==', true)
      .orderBy('created')
      .limit(RESULTS_PER_PAGE);

    query.get().then((response) => {
      const unsubscribe = createWatcher(query, (change) => {
        dispatch('handleUpdate', change);
      });

      commit('ADD_UNSUBSCRIBE', unsubscribe);

      if (response.docs.length < RESULTS_PER_PAGE) {
        commit('END_OF_PUBLISHED');
      }
    });
  },
  bindSearch() {
    // TODO: duplicate bindPublished, but include search
  },
  bindNext({ commit, dispatch }) {
    const query = this.$fire.firestore
      .collection('lists')
      .where('published', '==', true)
      .orderBy('created')
      .startAfter(lastDoc)
      .limit(RESULTS_PER_PAGE);

    query.get().then((response) => {
      const unsubscribe = createWatcher(query, (change) => {
        dispatch('handleUpdate', change);
      });

      commit('ADD_UNSUBSCRIBE', unsubscribe);

      if (response.docs.length < RESULTS_PER_PAGE) {
        commit('END_OF_PUBLISHED');
      }
    });
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
    commit('UNSUBSCRIBE_OWNED');
  },
  unbindPublished({ commit }) {
    commit('UNSUBSCRIBE_PUBLISHED');
  },
};
