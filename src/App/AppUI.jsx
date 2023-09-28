import { PropTypes } from 'prop-types';
import { CreateTodoButton } from '../components/CreateTodoButton';
import { TodoList } from '../components/TodoList';
import { TodoItem } from '../components/TodoItem';
import { TodoSearch } from '../components/TodoSearch';
import { TodoCounter } from '../components/TodoCounter';

const AppUI = ({
  isLoading,
  searchedTodos,
  totalTodos,
  completedTodos,
  searchValue,
  setSearchValue,
  completeTodo,
  uncompleteTodo,
  deleteTodo,
}) => {
  console.log('isLoading', isLoading);
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
};

AppUI.propTypes = {
  isLoading: PropTypes.any,
  totalTodos: PropTypes.any,
  completedTodos: PropTypes.any,
  searchValue: PropTypes.any,
  setSearchValue: PropTypes.any,
  searchedTodos: PropTypes.any,
  completeTodo: PropTypes.any,
  uncompleteTodo: PropTypes.any,
  deleteTodo: PropTypes.any,
};

export default AppUI;
