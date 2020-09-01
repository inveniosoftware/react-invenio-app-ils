import _capitalize from 'lodash/capitalize';
import _find from 'lodash/find';
import _get from 'lodash/get';
import _map from 'lodash/map';
import _merge from 'lodash/merge';
import { APP_CONFIG, RECORDS_CONFIG } from './defaultConfig';

class Config {
  constructor() {
    this.APP = APP_CONFIG;
    Object.assign(this, { ...RECORDS_CONFIG });
  }

  merge = newConfig => {
    Object.assign(this, _merge(this, newConfig));
    Object.freeze(this);
  };
}

export const invenioConfig = new Config();

export const getSearchConfig = (modelName, extraOptions = {}) => {
  const config = invenioConfig[modelName].search;
  const result = {
    FILTERS: config.filters,
    RESULTS_PER_PAGE: [
      {
        text: '15',
        value: 15,
      },
      {
        text: '30',
        value: 30,
      },
      {
        text: '60',
        value: 60,
      },
    ],
    SORT_BY: config.sortBy.values.map(sortField => {
      return {
        text: sortField.title,
        value: sortField.field,
        defaultValue: sortField.default_order,
      };
    }),
    SORT_BY_ON_EMPTY_QUERY: config.sortBy.onEmptyQuery,
    SORT_ORDER: config.sortOrder.map(sortField => {
      return { text: _capitalize(sortField), value: sortField };
    }),
  };
  return _merge(result, extraOptions);
};

export function getDisplayVal(configField, value) {
  return _get(invenioConfig, configField).find(entry => entry.value === value)
    .text;
}

export const getStaticPagesRoutes = () => {
  return _map(invenioConfig.APP.staticPages, 'route');
};

export const getStaticPageByRoute = path => {
  return _find(invenioConfig.APP.staticPages, ['route', path]);
};

export const getStaticPageByName = name => {
  return _find(invenioConfig.APP.staticPages, ['name', name]);
};
