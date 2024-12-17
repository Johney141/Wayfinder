import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Hits, SearchBox, } from 'react-instantsearch';
// import { IoIosSearch } from "react-icons/io";
import { useSelector } from 'react-redux';
import Hit from './Hits/Hit';
import './SearchBar.css';


const client = algoliasearch(
    import.meta.env.VITE_ALGOLIA_APP_ID,
    import.meta.env.VITE_ALGOLIA_SEARCH_API_KEY
);

// const SearchIcon = () => <IoIosSearch className='search-icon' />;

function SearchBar() {
    const orgId = useSelector(state => state.sessionState.user.Organization.id);


  return (
    <InstantSearch indexName={`org_${orgId}_articles`} searchClient={client}>
      <div className='search-container'>
      <SearchBox 
          // submitIconComponent={SearchIcon}
          resetIconComponent={() => <span />}
          classNames={{
            form: 'search-wrapper',
            input: 'search-bar',
            submitIcon: 'search-icon',
            reset: 'is-reset-button'
          }}  
      />
      </div>
      <div className='hits-container'>
        <Hits 
          hitComponent={Hit}
          classNames={{
            list: 'hits-list'
          }}
        />
      </div>
    </InstantSearch>
  );
}

export default SearchBar;