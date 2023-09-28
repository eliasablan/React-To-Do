import { PropTypes } from 'prop-types';

function TodoItem({ todo }) {
  return (
    <li>
      <p className={todo.finished ? 'line-through' : null}>{todo.todo}</p>
    </li>
  );
}
TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
};

export { TodoItem };
