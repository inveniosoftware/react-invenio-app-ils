import _find from 'lodash/find';
import _map from 'lodash/map';

export const getStaticPagesRoutes = staticPages => {
  return _map(staticPages, 'route');
};

export const getStaticPageByRoute = (staticPages, path) => {
  return _find(staticPages, ['route', path]);
};

export const getStaticPageByName = (staticPages, name) => {
  return _find(staticPages, ['name', name]);
};

export const uiConfig = {
  LOGO_SRC: process.env.PUBLIC_URL + '/logo-invenio-ils.svg',
  ES_DELAY: 3000,
  SUCCESS_AUTO_DISMISS_SECONDS: 10,
  extensions: {
    document: {
      label: 'Other',
      fields: {},
    },
    series: {
      label: 'Other',
      fields: {},
    },
  },
  staticPages: [
    { name: 'about', route: '/about', apiURL: '1' },
    { name: 'contact', route: '/contact', apiURL: '2' },
  ],
};
