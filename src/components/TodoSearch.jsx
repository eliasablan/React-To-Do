import { PropTypes } from 'prop-types';

function TodoSearch({ searchValue, setSearchValue }) {
  return (
    <input
      value={searchValue}
      className="mb-4 rounded-md"
      placeholder="filtra tus TO-DOs"
      onChange={(event) => setSearchValue(event.target.value)}
    />
  );
}

TodoSearch.propTypes = {
  searchValue: PropTypes.string,
  setSearchValue: PropTypes.func,
};

export { TodoSearch };
