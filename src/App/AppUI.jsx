import { useState, useEffect, useContext } from 'react';
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
    refreshCall,
    getTodos,
    isLoading,
    searchedTodos,
    completeTodo,
    uncompleteTodo,
    deleteTodo,
  } = useContext(TodoContext);
  const { isAuthenticated, isAuthLoading } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      getTodos();
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      getTodos();
    }
  }, [isAuthenticated, refreshCall]);

  return (
    <div className="pb-10">
      {!isAuthenticated ? (
        isAuthLoading ? (
          <TodosLoading className="mt-20" />
        ) : (
          <div className="grid grid-cols-2">
            <h1 className="col-span-2 mt-14 ml-14 text-4xl font-semibold">
              Tasks App
            </h1>
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
      <p className="pt-24 px-7 text-center text-at font-semibold text-lg">
        Developed by{' '}
        <a className="text-ic" href="https://github.com/eliasablan">
          Elias Ablan
        </a>
        .
      </p>
    </div>
  );
};

export default AppUI;
