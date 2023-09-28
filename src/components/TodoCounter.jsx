import { PropTypes } from 'prop-types';

function TodoCounter({ total, completed }) {
  return (
    <>
      <h1 className="p-12 text-lg text-sc font-semibold">
        Has completado {completed} de {total} TO-DOs
      </h1>
    </>
  );
}

TodoCounter.propTypes = {
  total: PropTypes.number.isRequired,
  completed: PropTypes.number.isRequired,
};

export { TodoCounter };
