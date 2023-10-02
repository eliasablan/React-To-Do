import { useContext, useEffect } from 'react';

import { CreateTodoButton } from '../components/CreateTodoButton';
import { TodoList } from '../components/TodoList';
import { TodoItem } from '../components/TodoItem';
import { TodoSearch } from '../components/TodoSearch';
import { TodoCounter } from '../components/TodoCounter';
import { TodosLoading } from '../components/TodosLoading';

import { TodoContext } from '../TodoContext';

const AppUI = () => {
  const {
    getTodos,
    isLoading,
    searchedTodos,
    completeTodo,
    uncompleteTodo,
    deleteTodo,
  } = useContext(TodoContext);

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="m-14 text-center">
      <div className="m-14 text-center">
        <TodoCounter />
        <TodoSearch />
        {isLoading ? (
          <TodosLoading />
        ) : (
          <TodoList>
            {searchedTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onComplete={() => completeTodo(todo.id)}
                onIncomplete={() => uncompleteTodo(todo.id)}
                onRemove={() => deleteTodo(todo.id)}
              />
            ))}
          </TodoList>
        )}
        <CreateTodoButton />
      </div>
    </div>
  );
};

export default AppUI;
