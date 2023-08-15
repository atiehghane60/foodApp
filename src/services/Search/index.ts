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
};
