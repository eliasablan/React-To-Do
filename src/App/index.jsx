import { useEffect } from 'react';

import { useLocalStorage } from '../useLocalStorage';
import { getTodos } from '../utils';
import { useTodos } from '../useTodos';
import AppUI from './AppUI';

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
    <AppUI
      isLoading={isLoading}
      searchedTodos={searchedTodos}
      totalTodos={totalTodos}
      completedTodos={completedTodos}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      completeTodo={completeTodo}
      uncompleteTodo={uncompleteTodo}
      deleteTodo={deleteTodo}
    />
  );
}

export default App;
