import sanitizeHtml from 'sanitize-html';
import Filter from 'bad-words';
import badwords from '~/scripts/config/badwords.js';

const profanityFilter = new Filter();

profanityFilter.addWords(...badwords);

const cleanAndSanitize = (str) => {
  const sanitized = sanitizeHtml(str);
  return sanitized.length > 0 ? profanityFilter.clean(sanitized) : sanitized;
};

export default cleanAndSanitize;
