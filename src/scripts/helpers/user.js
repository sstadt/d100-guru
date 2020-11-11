import md5 from 'js-md5';

/**
 * Build the basic user profile options during accoutn creation.
 *
 * @param {Object} options Options for building the user profile
 * @returns {Object} The compiled user profile options
 */
export const buildUserProfileOptions = ({ displayName, email }) => {
  const photoURL = `https://www.gravatar.com/avatar/${md5(email)}`;
  const options = { photoURL };

  if (displayName) {
    options.displayName = displayName;
  }

  return options;
};
