import { http } from '@api/base';

const bannerURL = '/banners/';

const getActive = async () => {
  const URLPath = window.location.pathname;
  return await http.get(`${bannerURL}active`, {
    params: { url_path: URLPath },
  });
};

export const bannerApi = {
  getActive: getActive,
  url: bannerURL,
};
