import { get } from '../api-requests';

export default {
  recipeInformation: (id: string | undefined) =>
    get({
      api: `/recipes/${id}/information`,
    }),
  SimilarRecipe: (id: string | undefined) =>
    get({
      api: `/recipes/${id}/similar`,
    }),
};
