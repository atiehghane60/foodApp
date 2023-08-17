import SearchServices from 'services/Search';

interface complexSearchType {
  [key: string]: string;
}
function useSearch() {
  function complexSearch(model: complexSearchType) {
    return SearchServices.complexSearch(model);
  }
  function autoCompleteRecipeSearch(query: string) {
    return SearchServices.autocompleteRecipeSearch(query);
  }

  return {
    complexSearch,
    autoCompleteRecipeSearch
  };
}
export default useSearch;
