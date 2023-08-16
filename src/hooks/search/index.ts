import SearchServices from 'services/Search';

interface complexSearchType {
  [key: string]: string;
}
function useSearch() {
  function complexSearch(model: complexSearchType) {
    return SearchServices.complexSearch(model);
  }

  return {
    complexSearch,
  };
}
export default useSearch;
