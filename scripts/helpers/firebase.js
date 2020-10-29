/**
 * Sets up actions for simple Firebase collections
 * @param {*} ref TODO: exactly what kind of Firebase object is this?
 * @param {function} commit Vuex commit function
 *
 * Usage
 *
 * For simple updates from Firebase, use createWatcher
 * to automatically trigger actions in the store when
 * a document is updated in Firebase.
 *
 * -------------------------------------------------------
 * If you need to do anything special with cloud functions
 * or special operations on data in the store then this
 * is not the module for you !!!
 * -------------------------------------------------------
 *
 * Calling createWatcher will set up the following actions:
 *
 * ADD: TODO
 * UPDATE: TODO
 * REMOVE: TODO
 *
 */
export const createWatcher = (ref, commit) => {
  return ref.onSnapshot((snapshot) => {
    return snapshot
      .docChanges()
      .forEach((change) => changeHandler(change, commit));
  });
};

/**
 * Handler function for Firebase document updates
 * Abstracted out for readability
 * @param {object} change TODO: exactly what object is this in firebase?
 * @param {commit} commit Vuex commit function
 */
const changeHandler = (change, commit) => {
  switch (change.type) {
    case 'added':
      commit('ADD', { ...change.doc.data(), id: change.doc.id });
      break;
    case 'modified':
      commit('UPDATE', { ...change.doc.data(), id: change.doc.id });
      break;
    case 'removed':
      commit('REMOVE', change.doc.id);
      break;
    // default:
    // TODO
    // console.warn('--- unhandled change type');
    // console.warn(change.type);
  }
};
