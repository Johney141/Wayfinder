import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Hits, SearchBox, } from 'react-instantsearch';
import { useSelector } from 'react-redux';
import Hit from './Hits/Hit';
import './SearchBar.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const client = algoliasearch(
    import.meta.env.VITE_ALGOLIA_APP_ID,
    import.meta.env.VITE_ALGOLIA_SEARCH_API_KEY
);



function SearchBar() {
  const orgId = useSelector(state => state.sessionState.user.Organization.id);
  const [isFocused, setIsFocused] = useState(false); 
  const navigate = useNavigate();


  const handleSearchSubmit = (event, searchQuery) => {
    event.preventDefault();  // Prevent default form submission
    const trimmedSearch = searchQuery.trim();
    if (trimmedSearch) {
      navigate(`/${orgId}/articles/search?q=${trimmedSearch}`);
    }
  };

  const handleClick = () => {
    setIsFocused(false);
  }


  return (
    <InstantSearch indexName={`org_${orgId}_articles`} searchClient={client}>
      <div className='search-container'>
      <SearchBox 
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          resetIconComponent={() => <span />}
          onSubmit={(event) => handleSearchSubmit(event, event.target.querySelector('input').value)}
          classNames={{
            form: 'search-wrapper',
            input: 'search-bar',
            submitIcon: 'search-icon',
            reset: 'is-reset-button'
          }} 
          
      />
      </div>
      {(isFocused ) && (
        <div className='hits-container'>
          <Hits 
            hitComponent={({ hit }) => <Hit hit={hit} click={handleClick}/>}
            classNames={{
              list: 'hits-list'
            }}
          />
        </div>
      )}

    </InstantSearch>
  );
}

export default SearchBar;