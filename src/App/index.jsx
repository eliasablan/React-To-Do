import { useEffect } from 'react';

import { CreateTodoButton } from '../components/CreateTodoButton';
import { TodoList } from '../components/TodoList';
import { TodoItem } from '../components/TodoItem';
import { TodoSearch } from '../components/TodoSearch';
import { TodoCounter } from '../components/TodoCounter';

import { useLocalStorage } from '../useLocalStorage';
import { getTodos } from '../utils';
import { useTodos } from '../useTodos';

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

  return (
    <div className="m-14 text-center">
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="m-14 text-center">
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
        </div>
      )}
    </div>
  );
}

export default App;
