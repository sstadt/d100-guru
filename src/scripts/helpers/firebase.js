/**
 * Sets up actions for simple Firebase collections
 * @param {*} query TODO: exactly what kind of Firebase object is this?
 * @param {function} callback Callback function to execute on snapshot change
 * @returns {function} The unsubscribe function for this watcher
 */
export const createWatcher = (query, callback) => {
  return query.onSnapshot((snapshot) =>
    snapshot.docChanges().forEach((change) => callback(change))
  );
};
