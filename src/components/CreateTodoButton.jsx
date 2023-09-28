import { useDispatch } from 'react-redux';
import { toggleModalStatus } from '../appSlice';

function CreateTodoButton() {
  const dispatch = useDispatch();

  return (
    <button
      className="bg-ic border-2 border-at hover:bg-at hover:border-ic font-semibold text-sc mt-5 px-3 py-1 rounded-lg"
      onClick={() => dispatch(toggleModalStatus())}
    >
      Crea un TO-DO
    </button>
  );
}

export { CreateTodoButton };
