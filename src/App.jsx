import { useState, useEffect } from 'react';
import { CreateTodoButton } from './components/CreateTodoButton';
import { CreateTodoSlide } from './components/CreateTodoSlide';
import { TodoSearch } from './components/TodoSearch';

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

  useEffect(() => {
    getTodos().then((response) => setTodos(response));
  }, []);

  return (
    <>
      <div className="m-14 text-center">
        <TodoSearch />
        {todos.map((todo) => (
          <p className="my-1" key={todo.id}>
            {todo.todo}
          </p>
        ))}
        <CreateTodoButton />
      </div>
      <CreateTodoSlide />
    </>
  );
}

export default App;
