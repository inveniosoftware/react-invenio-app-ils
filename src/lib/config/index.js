import _find from 'lodash/find';
import _get from 'lodash/get';
import _map from 'lodash/map';
import _merge from 'lodash/merge';
import _isEmpty from 'lodash/isEmpty';
import { APP_CONFIG, RECORDS_CONFIG } from './defaultConfig';
import { UrlParamValidator } from 'react-searchkit';

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
    SORT_BY: config.sort,
    DEFAULT_PAGE: config.defaultPage,
    DEFAULT_SIZE: config.defaultSize,
    DEFAULT_LAYOUT: config.defaultLayout,
  };
  return _merge(result, extraOptions);
};

const findBySortTypeOrReturnFirst = (searchConfig, sortType) => {
  const getCreatedSort = searchConfig.SORT_BY.find(
    elem => elem.sortBy === sortType
  );
  return !_isEmpty(getCreatedSort) ? getCreatedSort : searchConfig.SORT_BY[0];
};

export const setReactSearchKitInitialQueryState = modelName => {
  const searchConfig = getSearchConfig(modelName);
  let initialState = {};
  if (searchConfig.DEFAULT_PAGE) {
    initialState['page'] = searchConfig.DEFAULT_PAGE;
  }
  if (searchConfig.DEFAULT_LAYOUT) {
    initialState['layout'] = searchConfig.DEFAULT_LAYOUT;
  }
  if (searchConfig.DEFAULT_SIZE) {
    initialState['size'] = searchConfig.DEFAULT_SIZE;
  }
  if (searchConfig.SORT_BY) {
    const defaultSort = findBySortTypeOrReturnFirst(searchConfig, 'bestmatch');
    initialState['sortBy'] = defaultSort.sortBy;
    initialState['sortOrder'] = defaultSort.sortOrder;
  }
  return initialState;
};

export const setReactSearchKitDefaultSortingOnEmptyQueryString = modelName => {
  const searchConfig = getSearchConfig(modelName);
  let sortObject = {};
  if (searchConfig.SORT_BY) {
    const defaultSort = findBySortTypeOrReturnFirst(searchConfig, 'created');
    sortObject['sortBy'] = defaultSort.sortBy;
    sortObject['sortOrder'] = defaultSort.sortOrder;
  }
  return sortObject;
};

class ILSUrlParamValidator {
  baseParamValidator = new UrlParamValidator();

  constructor(searchConfig) {
    this.searchConfig = searchConfig;
  }

  isValid = (urlHandler, key, value) => {
    if (!this.baseParamValidator.isValid(urlHandler, key, value)) {
      return false;
    } else {
      switch (key) {
        case 'sortBy':
          return this.searchConfig.SORT_BY.some(opt => value === opt.sortBy);
        case 'size':
          return this.searchConfig.RESULTS_PER_PAGE.some(
            opt => value === opt.value
          );
        default:
          return true;
      }
    }
  };
}

export const setReactSearchKitUrlHandler = (
  modelName,
  withUrlHandling = true
) => {
  return withUrlHandling
    ? {
        enabled: true,
        overrideConfig: {
          urlParamValidator: new ILSUrlParamValidator(
            getSearchConfig(modelName)
          ),
        },
      }
    : {
        enabled: false,
      };
};

export function getDisplayVal(configField, value) {
  return _get(invenioConfig, configField).find(entry => entry.value === value)
    .text;
}

export const getStaticPagesRoutes = () => {
  return _map(invenioConfig.APP.STATIC_PAGES, 'route');
};

export const getStaticPageByRoute = path => {
  return _find(invenioConfig.APP.STATIC_PAGES, ['route', path]);
};

export const getStaticPageByName = name => {
  return _find(invenioConfig.APP.STATIC_PAGES, ['name', name]);
};
