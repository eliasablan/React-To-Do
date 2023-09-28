import { useDispatch } from 'react-redux';
import { toggleModalStatus } from '../appSlice';

function CreateTodoButton() {
  const dispatch = useDispatch();

  return (
    <button
      className="bg-ic border-2 border-at hover:bg-at hover:border-ic text-sc mt-4 px-3 py-2 rounded-md"
      onClick={() => dispatch(toggleModalStatus())}
    >
      Create a Todo
    </button>
  );
}

export { CreateTodoButton };
