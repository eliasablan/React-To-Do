import { PropTypes } from 'prop-types';

const CreateTodoButton = ({ onOpen }) => {
  return (
    <button
      className="bg-ic border-2 border-at hover:bg-at hover:border-ic font-semibold text-sc mt-5 px-3 py-1 rounded-lg"
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
