const SearchResult = ({ result }) => {
  return (
    <div
      className="search-result"
      onClick={(e) => alert(`You selected ${result}!`)}
    >
      {result}
    </div>
  );
};

const SearchResultsList = ({ results, onResultClick }) => {
  return (
    <div className="results-list">
        {results.map((result, index) => (
            <div
                key={index}
                className="search-result"
                onClick={() => onResultClick(result.name)}
            >
                {result.name}
            </div>
      ))}
    </div>
  );
};

export default SearchResultsList