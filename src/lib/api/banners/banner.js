import { http } from '@api/base';
import { getSearchTotal } from '@api/utils';

const bannerURL = '/banners/';

const getActive = async () => {
  const URLPath = window.location.pathname;
  const response = await http.get(`${bannerURL}`, {
    params: { url_path: URLPath, active: true },
  });

  response.data.total = getSearchTotal(response.data.hits);
  response.data.hits = response.data.hits.hits;

  return response;
};

export const bannerApi = {
  getActive: getActive,
  url: bannerURL,
};
