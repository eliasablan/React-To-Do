import { useContext } from 'react';
import { TodoContext } from '../TodoContext';
import { AuthContext } from '../AuthContext';

const TodoCounter = () => {
  const { totalTodos, completedTodos } = useContext(TodoContext);
  const { username } = useContext(AuthContext);
  return (
    <>
      <div
        style={{ width: '250px' }}
        className="m-auto text-2xl text-at font-semibold text-left"
      >
        <h1>Welcome, {username}!</h1>
        <h1>
          You have {totalTodos} tasks in total. {completedTodos} completed
          and {totalTodos - completedTodos} pending.
        </h1>
      </div>
    </>
  );
};

export { TodoCounter };
