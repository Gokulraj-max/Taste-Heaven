import CuisinesComponent from '../Client/CuisinesComponent';
import NAVBAR from '../Client/Navbar';
import Searching from '../Client/SearchBar';

const Search = () => {
    return (
      <div>
        <NAVBAR />
        <Searching />   
        <CuisinesComponent />
      </div>
    );
  };
  export default Search;