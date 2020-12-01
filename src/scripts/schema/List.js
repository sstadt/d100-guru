/********************************
  Firebase doesn't like custom
  class objects, so we export
  a function in place of a
  constructor
********************************/

const List = ({ author, title, description }) => {
  return {
    author,
    title: title || '',
    description: description || '',
    published: false,
    items: [],
  };
};

export default List;
