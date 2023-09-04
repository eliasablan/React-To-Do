import { useDispatch } from 'react-redux';
import { toggleModalStatus } from '../appSlice';

function CreateTodoButton() {
  const dispatch = useDispatch();

  return (
    <div className="text-center">
      <button
        className="rounded-full mt-12 px-6 py-2 bg-slate-500 text-white"
        onClick={() => dispatch(toggleModalStatus())}
      >
        Create a Todo
      </button>
    </div>
  );
}

export { CreateTodoButton };
