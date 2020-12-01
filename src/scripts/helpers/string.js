/**
 * Create a hash for a given string
 *
 * @param {string} str The string to hash
 * @returns {string} The resulting string
 */
export const hash = (str) => {
  var hash = 0, i, chr;

  if (str.length === 0) return hash;

  for (i = 0; i < str.length; i++) {
    chr   = str.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }

  return hash;
};

/**
 * Handleize a given string
 *
 * @param {string} str The string to handleize
 * @returns {string} The resulting handl
 */
export const handleize = (str) => {
	return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '').replace(/^-/, '');
};

/**
 * Capitalize the first character in a string
 *
 * @param {string} value The string to capitalize
 * @returns {string} The resulting capitalized string
 */
export const ucfirst = (str) => `${str.charAt(0).toUpperCase()}${str.substring(1)}`;

/**
 * Capitalize each word in a string
 *
 * @param {string} str The string to upcase
 * @returns {string} The resulting string with each word capitalized
 */
export const upcase = (str) => str.split(' ').map((word) => ucfirst(word)).join(' ');
