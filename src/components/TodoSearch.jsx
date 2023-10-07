import { useContext } from 'react';
import { TodoContext } from '../TodoContext';

const TodoSearch = () => {
  const { isLoading, searchValue, setSearchValue } =
    useContext(TodoContext);
  return (
    <div className="text-center pb-12">
      <input
        value={searchValue}
        disabled={isLoading}
        placeholder="Busca tu TO-DO"
        onChange={(event) => setSearchValue(event.target.value)}
      />
    </div>
  );
};

export { TodoSearch };
