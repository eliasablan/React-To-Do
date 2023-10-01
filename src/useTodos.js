import { useState } from 'react';

const url = new URL(import.meta.env.VITE_LOCAL_DJANGO_URL);
const accesKey = import.meta.env.VITE_ACCESS_KEY;

export const useTodos = (initialValue) => {
  const [todos, setTodos] = useState(initialValue);
  const [todosLoading, setTodosLoading] = useState(false);

  const isFinished = async (todoId, value) => {
    try {
      setTodosLoading(true);
      const options = {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accesKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ finished: value }),
      };
      const response = await fetch(new URL(todoId, url), options);

      if (response.status !== 200) {
        throw {
          status: response.status,
          message: response.statusText,
        };
      }

      const data = await response.json();
      console.log('modified todo new data', data);
      setTodosLoading(false);
      return data;
    } catch (error) {
      console.log('isFinished error', error);
      return error;
    }
  };

  const completeTodo = (todoId) => isFinished(todoId, true);

  const uncompleteTodo = (todoId) => isFinished(todoId, false);

  const deleteTodo = async (todoId) => {
    try {
      setTodosLoading(true);
      const options = {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accesKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ deleted: true }),
      };
      const response = await fetch(new URL(todoId, url), options);

      if (response.status !== 200) {
        throw {
          status: response.status,
          message: response.statusText,
        };
      }

      const data = await response.json();
      console.log('deleteTodo todo data', data);
      setTodosLoading(false);
      return data;
    } catch (error) {
      console.log('deleteTodo error', error);
      return error;
    }
  };

  return [
    todos,
    setTodos,
    completeTodo,
    uncompleteTodo,
    deleteTodo,
    todosLoading,
    setTodosLoading,
  ];
};
