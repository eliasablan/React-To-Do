// import { useQuery } from '@tanstack/react-query';
import { useLocalStorage } from './useLocalStorage';
import { useState, createContext } from 'react';
import { PropTypes } from 'prop-types';

const url = new URL(import.meta.env.VITE_LOCAL_DJANGO_URL);
const accesKey = import.meta.env.VITE_ACCESS_KEY;

const TodoContext = createContext();

const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useLocalStorage('SEARCH-V1', '');

  const getTodos = () => {
    try {
      const options = {
        headers: {
          Authorization: `Bearer ${accesKey}`,
          Origin: '*',
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };
      fetch(url, options)
        .then((response) => response.json())
        .then((json) => {
          setTodos(json);
        })
        .then(() => {
          setIsLoading(false);
          console.log('getTodos success', todos);
        });
    } catch (error) {
      console.log('getTodos error', error);
    }
  };

  const searchedTodos = todos.filter((todo) => {
    const todoText = todo.todo.toLowerCase();
    const searchText = searchValue.toLowerCase();
    return !todo.deleted && todoText.includes(searchText);
  });

  const totalTodos = searchedTodos.length;
  const completedTodos = searchedTodos.filter(
    (todo) => !!todo.finished,
  ).length;

  const isFinished = async (todoId, value) => {
    try {
      const options = {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accesKey}`,
          Origin: '*',
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ finished: value }),
      };

      setIsLoading(true);
      fetch(new URL(todoId, url), options)
        .then((response) => {
          if (response.status !== 200) {
            setIsLoading(false);
            throw {
              status: response.status,
              message: response.statusText,
            };
          }
          return response.json();
        })
        .then(() => {
          getTodos();
        });
    } catch (error) {
      console.log('isFinished error', error);
      return error;
    }
  };

  const completeTodo = (todoId) => isFinished(todoId, true);

  const uncompleteTodo = (todoId) => isFinished(todoId, false);

  const deleteTodo = async (todoId) => {
    try {
      setIsLoading(true);
      const options = {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accesKey}`,
          Origin: '*',
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ deleted: true }),
      };

      fetch(new URL(todoId, url), options)
        .then((response) => {
          if (response.status !== 200) {
            setIsLoading(false);
            throw {
              status: response.status,
              message: response.statusText,
            };
          }
          return response.json();
        })
        .then(() => getTodos());
    } catch (error) {
      console.log('deleteTodo error', error);
      return error;
    }
  };

  return (
    <TodoContext.Provider
      value={{
        getTodos,
        isLoading,
        setIsLoading,
        searchedTodos,
        totalTodos,
        completedTodos,
        searchValue,
        setSearchValue,
        completeTodo,
        uncompleteTodo,
        deleteTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

TodoProvider.propTypes = {
  children: PropTypes.any,
};

export { TodoContext, TodoProvider };
