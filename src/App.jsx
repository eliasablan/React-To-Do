import { useState, useEffect } from 'react';
import { CreateTodoButton } from './components/CreateTodoButton';
import { CreateTodoSlide } from './components/CreateTodoSlide';
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

  const totalTodos = todos.length;
  const completedTodos = todos.filter((todo) => !!todo.finished).length;

  useEffect(() => {
    getTodos().then((response) => setTodos(response));
  }, []);

  return (
    <>
      <div className="m-14 text-center">
        <TodoCounter total={totalTodos} completed={completedTodos} />
        <TodoSearch
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />

        <TodoList>
          {todos.map((todo) => (
            <TodoItem todo={todo} key={todo.id} />
          ))}
        </TodoList>
        <CreateTodoButton />
      </div>
      <CreateTodoSlide />
    </>
  );
}

export default App;
