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
    todosLoading,
    setTodosLoading,
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
    if (!todosLoading) {
      getTodos()
        .then((response) => setTodos(response))
        .then(() => setTodosLoading(false));
    }
  }, [setTodos, setTodosLoading, todosLoading]);

  return (
    <AppUI
      todosLoading={todosLoading}
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
