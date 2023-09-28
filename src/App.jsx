import { useState, useEffect } from 'react';
import { CreateTodoButton } from './components/CreateTodoButton';
import { TodoList } from './components/TodoList';
import { TodoItem } from './components/TodoItem';
import { TodoSearch } from './components/TodoSearch';
import { TodoCounter } from './components/TodoCounter';

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

function App() {
  const [todos, setTodos] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const totalTodos = todos.length;
  const completedTodos = todos.filter((todo) => !!todo.finished).length;

  const searchedTodos = todos.filter((todo) => {
    const todoText = todo.todo.toLowerCase();
    const searchText = searchValue.toLowerCase();
    return todoText.includes(searchText);
  });

  const completeTodo = async (todoId) => {
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
        body: JSON.stringify({ finished: true }),
      };
      const response = await fetch(url, options);
      const data = await response.json();
      getTodos()
        .then((response) => setTodos(response))
        .then(() => setIsLoading(false));
      return data;
    } catch (error) {
      console.log('completeTodo error', error);
      return error;
    }
  };

  const uncompleteTodo = async (todoId) => {
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
        body: JSON.stringify({ finished: false }),
      };
      const response = await fetch(url, options);
      const data = await response.json();
      getTodos()
        .then((response) => setTodos(response))
        .then(() => setIsLoading(false));
      return data;
    } catch (error) {
      console.log('completeTodo error', error);
      return error;
    }
  };

  useEffect(() => {
    getTodos()
      .then((response) => setTodos(response))
      .then(() => setIsLoading(false));
  }, []);

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
          />
        ))}
      </TodoList>
      <CreateTodoButton />
    </>
  );
}

export default App;
