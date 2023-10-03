import { useContext } from 'react';
import { TodoContext } from '../TodoContext';

function TodoCounter() {
  const { totalTodos, completedTodos } = useContext(TodoContext);
  return (
    <>
      <h1 className="p-12 text-2xl text-at font-semibold">
        Has completado {completedTodos} de {totalTodos} TO-DOs
      </h1>
    </>
  );
}

export { TodoCounter };
