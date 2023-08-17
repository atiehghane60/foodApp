import { get } from '../api-requests';

interface complexSearchType {
  [key: string]: string;
}

export default {
  complexSearch: (model: complexSearchType) =>
    get({
      api: `/recipes/complexSearch`,
      model,
    }),
  autocompleteRecipeSearch: (query: string) =>
    get({
      api: `/recipes/autocomplete?number=10&query=${query}`,
    }),
};
