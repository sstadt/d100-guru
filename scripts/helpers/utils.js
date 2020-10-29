/**
 * Limit the frequenscy with which a function can fire
 * @param {function} func      Function to debounce
 * @param {integer}  wait      Debounce duration in milliseconds
 * @param {boolean}  immediate Call function immediately
 */
export const debounce = (func, wait, immediate) => {
  let timeout;

  return function () {
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
};

/**
 * Return a deep clone of promitive object values
 * @param {object} obj The object to clone
 */
export const clone = (obj) => {
  if (!obj) {
    // TODO
    // console.error(`cannot clone ${obj}`);
    return null;
  }

  return JSON.parse(JSON.stringify(obj));
};

/**
 * Apply a VanillaJS event handler and detach the
 * handler after the first event
 * @param {object} node DOM node to apply the event to
 * @param {string} type The event to listen for
 * @param {function} callback The callback function to execute on the event
 */
// TODO: needed?
// export const handleEventOnce = (node, type, callback) => {
// 	node.addEventListener(type, function(e) {
// 		e.target.removeEventListener(e.type, arguments.callee);
// 		return callback(e);
// 	});
// };
