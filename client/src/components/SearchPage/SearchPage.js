import SearchForm from "./SearchForm/SearchForm";
import SearchResult from "./SearchResult/SearchResult";
import { useSelector } from "react-redux";
import useStyles from "./styles";

const SearchPage = () => {
  const { isLoadingPet, petsQuery } = useSelector((state) => state.pets);
  const classes = useStyles();
  
  return (
    <div className={classes.searchPageContainer}>
      <SearchForm />
      <SearchResult searchResult={petsQuery} isLoading={isLoadingPet} />
    </div>
  );
};

export default SearchPage;
