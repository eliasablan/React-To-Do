import { PropTypes } from 'prop-types';

function TodoList({ children }) {
  return <ul>{children}</ul>;
}

TodoList.propTypes = {
  children: PropTypes.any,
};

export { TodoList };
