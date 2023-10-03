import { useState, useContext, useEffect } from 'react';

import { CreateTodoButton } from '../components/CreateTodoButton';
import { TodoList } from '../components/TodoList';
import { TodoItem } from '../components/TodoItem';
import { TodoSearch } from '../components/TodoSearch';
import { TodoCounter } from '../components/TodoCounter';
import { TodosLoading } from '../components/TodosLoading';
import { TodoContext } from '../TodoContext';
import { CreateTodoSlide } from '../components/CreateTodoSlide';
import { createPortal } from 'react-dom';

const AppUI = () => {
  const {
    getTodos,
    isLoading,
    searchedTodos,
    completeTodo,
    uncompleteTodo,
    deleteTodo,
  } = useContext(TodoContext);
  const [openModal, setOpenModal] = useState(false);

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
        <CreateTodoButton onOpen={() => setOpenModal(true)} />
        {openModal &&
          createPortal(
            <CreateTodoSlide
              openModal={openModal}
              onClose={() => setOpenModal(false)}
            />,
            document.body,
          )}
      </div>
    </div>
  );
};

export default AppUI;
