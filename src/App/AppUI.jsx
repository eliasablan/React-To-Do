import { useState, useContext } from 'react';
import { createPortal } from 'react-dom';

import { LoginForm } from '../components/Login';
import { RegisterForm } from '../components/Register';
import { LogoutButton } from '../components/Logout';
import { TodosLoading } from '../components/TodosLoading';
import { TodoCounter } from '../components/TodoCounter';
import { TodoSearch } from '../components/TodoSearch';
import { TodoList } from '../components/TodoList';
import { TodoItem } from '../components/TodoItem';
import { CreateTodoButton } from '../components/CreateTodoButton';
import { CreateTodoSlide } from '../components/CreateTodoSlide';

import { TodoContext } from '../TodoContext';
import { AuthContext } from '../AuthContext';

const AppUI = () => {
  const [openModal, setOpenModal] = useState(false);
  const {
    isLoading,
    searchedTodos,
    completeTodo,
    uncompleteTodo,
    deleteTodo,
  } = useContext(TodoContext);
  const { isAuthenticated, isAuthLoading } = useContext(AuthContext);

  return (
    <div>
      {!isAuthenticated ? (
        isAuthLoading ? (
          <TodosLoading className="mt-20" />
        ) : (
          <div className="grid grid-cols-2">
            <LoginForm />
            <RegisterForm />
          </div>
        )
      ) : (
        <div>
          <LogoutButton />
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
          <CreateTodoButton
            isLoading={isLoading}
            onOpen={() => setOpenModal(true)}
          />
          {openModal &&
            createPortal(
              <CreateTodoSlide
                openModal={openModal}
                onClose={() => setOpenModal(false)}
              />,
              document.body,
            )}
        </div>
      )}
    </div>
  );
};

export default AppUI;
