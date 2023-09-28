import { useDispatch } from 'react-redux';
import { toggleModalStatus } from '../appSlice';

function CreateTodoButton() {
  const dispatch = useDispatch();

  return (
    <button
      className="rounded-md mt-4 px-3 py-1"
      onClick={() => dispatch(toggleModalStatus())}
    >
      Create a Todo
    </button>
  );
}

export { CreateTodoButton };
