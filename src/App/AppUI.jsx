import { PropTypes } from 'prop-types';
import { CreateTodoButton } from '../components/CreateTodoButton';
import { TodoList } from '../components/TodoList';
import { TodoItem } from '../components/TodoItem';
import { TodoSearch } from '../components/TodoSearch';
import { TodoCounter } from '../components/TodoCounter';
import { TodosLoading } from '../components/TodosLoading';

const AppUI = ({
  todosLoading,
  searchedTodos,
  totalTodos,
  completedTodos,
  searchValue,
  setSearchValue,
  completeTodo,
  uncompleteTodo,
  deleteTodo,
}) => {
  return (
    <div className="m-14 text-center">
      {/* <TodosLoading /> */}
      {todosLoading ? (
        <TodosLoading />
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
  todosLoading: PropTypes.any,
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
