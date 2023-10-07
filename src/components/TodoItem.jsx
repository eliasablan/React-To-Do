import { PropTypes } from 'prop-types';

const TodoItem = ({ todo, onComplete, onIncomplete, onRemove }) => {
  return (
    <li>
      <p className="text-xl text-at font-semibold py-5 my-5 hover:bg-sc">
        <span
          className="cursor-default"
          onClick={todo.finished ? onIncomplete : onComplete}
        >
          ✓
        </span>
        <span className={`mx-5 ${todo.finished ? 'line-through' : null}`}>
          {todo.todo}
        </span>
        <span className="cursor-default" onClick={onRemove}>
          ☓
        </span>
      </p>
    </li>
  );
};
TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  onComplete: PropTypes.func,
  onIncomplete: PropTypes.func,
  onRemove: PropTypes.func,
};

export { TodoItem };
