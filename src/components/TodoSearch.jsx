import { useContext } from 'react';
import { TodoContext } from '../TodoContext';

function TodoSearch() {
  const { searchValue, setSearchValue } = useContext(TodoContext);
  return (
    <input
      value={searchValue}
      className="bg-pg border-4 border-ic p-2 pl-4 mb-4 rounded-md font-semibold placeholder:font-semibold placeholder:text-at"
      placeholder="Filtra TO-DOs"
      onChange={(event) => setSearchValue(event.target.value)}
    />
  );
}

export { TodoSearch };
