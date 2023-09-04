import { PropTypes } from 'prop-types';
import '../assets/styles/TodoCounter.css';

function TodoCounter({ total, completed }) {
  return (
    <h1>
      Has completado {completed} de {total} TODOS
    </h1>
  );
}
TodoCounter.propTypes = {
  total: PropTypes.string.isRequired,
  completed: PropTypes.string.isRequired,
};

export { TodoCounter };
