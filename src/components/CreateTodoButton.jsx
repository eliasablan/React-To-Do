import { PropTypes } from 'prop-types';

const CreateTodoButton = ({ onOpen }) => {
  return (
    <button
      className="bg-pg border-4 border-ic p-2 hover:bg-ic font-semibold text-at mt-4 rounded-md"
      onClick={onOpen}
    >
      Crea un TO-DO
    </button>
  );
};
CreateTodoButton.propTypes = {
  onOpen: PropTypes.any,
};
export { CreateTodoButton };
