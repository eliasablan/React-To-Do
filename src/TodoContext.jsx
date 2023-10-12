import { useState, createContext, useContext } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { PropTypes } from 'prop-types';

import { AuthContext } from './AuthContext';

const todos_url = import.meta.env.VITE_TODOS_URL;

const TodoContext = createContext();

const TodoProvider = ({ children }) => {
  // Bring JWT Access Token for Headers and method for refreshing the token
  const { accessToken, refreshAccessToken } = useContext(AuthContext);

  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshCall, setRefreshCall] = useState(false);
  const [searchValue, setSearchValue] = useLocalStorage('SEARCH-V1', '');

  const getTodos = async () => {
    setIsLoading(true);
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Origin: '*',
      },
    };

    const response = await fetch(todos_url, options);
    const responseJson = await response.json();
    if (response.status == 401) {
      // Refresh ACCESS TOKEN
      refreshAccessToken();
      setRefreshCall((prevState) => !prevState);
    } else {
      setTodos(responseJson);
    }
    setIsLoading(false);
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

  const modifyTodo = (todoId, modification) => {
    setIsLoading(true);
    const options = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Origin: '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(modification),
    };

    fetch(new URL(todoId, todos_url), options)
      .then((response) => {
        if (!response.ok) {
          setIsLoading(false);
          console.log({
            message: 'MODIFY_TODO_ERROR',
            modification,
          });
          throw {
            message: 'MODIFY_TODO_ERROR',
            modification,
          };
        }
        return response.json();
      })
      .then(() => getTodos());
  };

  const completeTodo = (id) => modifyTodo(id, { finished: true });
  const uncompleteTodo = (id) => modifyTodo(id, { finished: false });
  const deleteTodo = (id) => modifyTodo(id, { deleted: true });

  const createTodo = (newTodo) => {
    try {
      setIsLoading(true);
      const options = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Origin: '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ todo: newTodo }),
      };

      fetch(todos_url, options)
        .then((response) => {
          if (response.status !== 201) {
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
      console.log('createTodo error', error);
      return error;
    }
  };

  return (
    <TodoContext.Provider
      value={{
        refreshCall,
        getTodos,
        isLoading,
        setIsLoading,
        searchedTodos,
        totalTodos,
        completedTodos,
        searchValue,
        setSearchValue,
        createTodo,
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
