/********************************
  Firebase doesn't like custom
  class objects, so we export
  a function in place of a
  constructor
********************************/

import { v4 as uuidv4 } from 'uuid';

const ListEntry = (options = {}) => {
  return {
    id: uuidv4(),
    value: options.value || '',
  };
};

export default ListEntry;
