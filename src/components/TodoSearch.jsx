import { PropTypes } from 'prop-types';

function TodoSearch({ searchValue, setSearchValue }) {
  return (
    <input
      value={searchValue}
      className="bg-at border-2 border-ic p-1 pl-2 mb-4 rounded-md placeholder:italic placeholder:text-sc"
      placeholder="Filtra tus TO-DOs"
      onChange={(event) => setSearchValue(event.target.value)}
    />
  );
}

TodoSearch.propTypes = {
  searchValue: PropTypes.string,
  setSearchValue: PropTypes.func,
};

export { TodoSearch };
