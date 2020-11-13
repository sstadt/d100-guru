/********************************
  Firebase doesn't like custom
  class objects, so we export
  a function in place of a
  constructor
********************************/

import { v4 as uuidv4 } from 'uuid';

const ListItem = ({ value }) => {
  return {
    id: uuidv4(),
    value: value || '',
  };
};

export default ListItem;
