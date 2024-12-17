import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Hits, SearchBox, } from 'react-instantsearch';
import { IoIosSearch } from "react-icons/io";
import { useSelector } from 'react-redux';


const client = algoliasearch(
    import.meta.env.VITE_ALGOLIA_APP_ID,
    import.meta.env.VITE_ALGOLIA_SEARCH_API_KEY
);

function Hit({ hit }) {
    console.log(hit)
    return JSON.stringify(hit.title);
  }

function SearchBar() {
    const orgId = useSelector(state => state.sessionState.user.Organization.id);


  return (
    <InstantSearch indexName={`org_${orgId}_articles`} searchClient={client}>
        <SearchBox 
            submitIconComponent={IoIosSearch}        
        />

      <Hits hitComponent={Hit} />
    </InstantSearch>
  );
}

export default SearchBar;