import { PropTypes } from 'prop-types';

function TodoItem({ todo, onComplete, onIncomplete }) {
  return (
    <li>
      <p>
        <span
          className="cursor-default"
          onClick={todo.finished ? onIncomplete : onComplete}
        >
          {!todo.finished ? '☓' : '✓'}
        </span>
        <span className={`ml-5 ${todo.finished ? 'line-through' : null}`}>
          {todo.todo}
        </span>
      </p>
    </li>
  );
}
TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  onComplete: PropTypes.func,
  onIncomplete: PropTypes.func,
};

export { TodoItem };
