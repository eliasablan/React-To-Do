import { PropTypes } from 'prop-types';

const CreateTodoButton = ({ isLoading, onOpen }) => {
  return (
    <div className="text-center p-6">
      <button disabled={isLoading} onClick={onOpen}>
        Crea un TO-DO
      </button>
    </div>
  );
};

CreateTodoButton.propTypes = {
  onOpen: PropTypes.any,
  isLoading: PropTypes.any,
};

export { CreateTodoButton };
