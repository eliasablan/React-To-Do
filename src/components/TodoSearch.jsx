import { useContext } from 'react';
import { TodoContext } from '../TodoContext';

const TodoSearch = () => {
  const { isLoading, searchValue, setSearchValue } =
    useContext(TodoContext);
  return (
    <div className="text-center py-12">
      <input
        value={searchValue}
        disabled={isLoading}
        placeholder="Filter tasks..."
        onChange={(event) => setSearchValue(event.target.value)}
      />
    </div>
  );
};

export { TodoSearch };
