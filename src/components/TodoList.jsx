import { PropTypes } from 'prop-types';

const TodoList = ({ children }) => {
  return <ul className="text-center">{children}</ul>;
};

TodoList.propTypes = {
  children: PropTypes.any,
};

export { TodoList };
