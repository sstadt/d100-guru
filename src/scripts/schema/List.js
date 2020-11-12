/********************************
  Firebase doesn't like custom
  class object, so we export
  a function in place of a
  constructor
********************************/

const List = ({ author, title, description }) => {
  return {
    author,
    title: title || '',
    description: description || '',
    items: [],
  };
};

export default List;
