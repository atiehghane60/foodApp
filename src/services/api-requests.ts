import axios from './middleware';
import qs from 'qs';

interface Types {
  api: string;
  model: any;
  headerType?: string;
}

export const post = ({ api, model, headerType }: Types) => {
  return axios.post(
    api,
    model,
    headerType
      ? {
          headers: {
            'content-type': headerType,
          },
        }
      : {}
  );
};

export const get = ({ api, model }: Types) => {
  const params = qs.stringify(model);
  const hasQuestionMark = params !== '' && api[api.length - 1] !== '?';
  return axios.get(
    `${api}${params ? `${hasQuestionMark ? '?' : ''}&${params}` : ''}`
  );
};

export const deleted = ({ api, model }: Types) => {
  return axios.delete(api, {
    data: model,
  });
};

export const put = ({ api, model }: Types) => {
  return axios.put(api, model);
};

export const patch = ({ api, model }: Types) => {
  axios.patch(api, {
    model,
  });
};
