import RecipeServices from 'services/Recipe';

interface complexSearchType {
  [key: string]: string;
}
function useSearch() {
  function recipeInformation(id: string | undefined) {
    return RecipeServices.recipeInformation(id);
  }
  function SimilarRecipe(id: string | undefined) {
    return RecipeServices.SimilarRecipe(id);
  }
  return {
    recipeInformation,
    SimilarRecipe,
  };
}
export default useSearch;
