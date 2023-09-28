import { useState, useEffect } from 'react';
import { CreateTodoButton } from './components/CreateTodoButton';
import { TodoList } from './components/TodoList';
import { TodoItem } from './components/TodoItem';
import { TodoSearch } from './components/TodoSearch';
import { TodoCounter } from './components/TodoCounter';

const useLocalStorage = (itemName, initialValue) => {
  const localStorageItem = localStorage.getItem(itemName);

  let parsedItem;

  if (!localStorageItem) {
    localStorage.setItem(itemName, JSON.stringify(initialValue));
    parsedItem = initialValue;
  } else {
    parsedItem = JSON.parse(localStorageItem);
  }
  const [item, setItem] = useState(parsedItem);

  const saveItem = (newItem) => {
    console.log(newItem);
    localStorage.setItem(itemName, JSON.stringify(newItem));
    setItem(newItem);
  };

  return [item, saveItem];
};

const getTodos = async () => {
  try {
    const url = 'http://127.0.0.1:8000/api/todos/';
    const accesKey =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk2Mzk5NzU1LCJpYXQiOjE2OTU3MTE1NDQsImp0aSI6ImZlODZjOGYzZTI0MTQ1Zjc4MDFhN2M1N2JiYTJjMTc5IiwidXNlcl9pZCI6MX0.YHpZcNs_powC4edo1QNzcMu6lOLQxL3Z5uxaFlfl2Qc';
    const options = {
      headers: {
        Authorization: `Bearer ${accesKey}`,
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('getTodos error', error);
    return [];
  }
};

const useTodos = (initialValue) => {
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

function App() {
  const [
    todos,
    setTodos,
    completeTodo,
    uncompleteTodo,
    deleteTodo,
    isLoading,
    setIsLoading,
  ] = useTodos([]);
  const [searchValue, setSearchValue] = useLocalStorage('SEARCH-V1', '');

  const searchedTodos = todos.filter((todo) => {
    const todoText = todo.todo.toLowerCase();
    const searchText = searchValue.toLowerCase();
    return !todo.deleted && todoText.includes(searchText);
  });

  const totalTodos = searchedTodos.length;
  const completedTodos = searchedTodos.filter(
    (todo) => !!todo.finished,
  ).length;

  useEffect(() => {
    if (!isLoading) {
      getTodos()
        .then((response) => setTodos(response))
        .then(() => setIsLoading(false));
    }
  }, [setTodos, setIsLoading, isLoading]);

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <>
      <TodoCounter total={totalTodos} completed={completedTodos} />
      <TodoSearch
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />

      <TodoList>
        {searchedTodos.map((todo) => (
          <TodoItem
            todo={todo}
            key={todo.id}
            onComplete={() => completeTodo(todo.id)}
            onIncomplete={() => uncompleteTodo(todo.id)}
            onRemove={() => deleteTodo(todo.id)}
          />
        ))}
      </TodoList>
      <CreateTodoButton />
    </>
  );
}

export default App;
