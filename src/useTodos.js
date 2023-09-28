import { useState } from "react";

export const useTodos = (initialValue) => {
  const [todos, setTodos] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);

  const isFinished = async (todoId, value) => {
    try {
      setIsLoading(true);
      const url = `http://127.0.0.1:8000/api/todos/${todoId}`;
      const accesKey =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk2Mzk5NzU1LCJpYXQiOjE2OTU3MTE1NDQsImp0aSI6ImZlODZjOGYzZTI0MTQ1Zjc4MDFhN2M1N2JiYTJjMTc5IiwidXNlcl9pZCI6MX0.YHpZcNs_powC4edo1QNzcMu6lOLQxL3Z5uxaFlfl2Qc';
      const options = {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accesKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ finished: value }),
      };
      const response = await fetch(url, options);

      if (response.status !== 200) {
        throw {
          status: response.status,
          message: response.statusText,
        };
      }

      const data = await response.json();
      console.log('isFinished todo data', data);
      setIsLoading(false);
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
      setIsLoading(true);
      const url = `http://127.0.0.1:8000/api/todos/${todoId}`;
      const accesKey =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk2Mzk5NzU1LCJpYXQiOjE2OTU3MTE1NDQsImp0aSI6ImZlODZjOGYzZTI0MTQ1Zjc4MDFhN2M1N2JiYTJjMTc5IiwidXNlcl9pZCI6MX0.YHpZcNs_powC4edo1QNzcMu6lOLQxL3Z5uxaFlfl2Qc';
      const options = {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accesKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ deleted: true }),
      };
      const response = await fetch(url, options);

      if (response.status !== 200) {
        throw {
          status: response.status,
          message: response.statusText,
        };
      }

      const data = await response.json();
      console.log('deleteTodo todo data', data);
      setIsLoading(false);
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
    isLoading,
    setIsLoading,
  ];
};
