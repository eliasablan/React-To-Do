import { useContext } from 'react';
import { TodoContext } from '../TodoContext';

function TodoSearch() {
  const { searchValue, setSearchValue } = useContext(TodoContext);
  return (
    <input
      value={searchValue}
      className="bg-at border-2 border-ic p-1 pl-2 mb-4 rounded-md placeholder:italic placeholder:font-semibold placeholder:text-sc"
      placeholder="Filtra TO-DOs"
      onChange={(event) => setSearchValue(event.target.value)}
    />
  );
}

export { TodoSearch };
