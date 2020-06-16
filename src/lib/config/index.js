import _get from 'lodash/get';
import _merge from 'lodash/merge';
import { invenioConfig } from './invenioConfig';
import { searchConfig } from './searchConfig';
import { uiConfig } from './uiConfig';

export function initConfig(config) {
  _merge(invenioConfig, _get(config, 'invenioConfig'));
  Object.freeze(invenioConfig);

  _merge(uiConfig, _get(config, 'uiConfig'));
  Object.freeze(uiConfig);

  _merge(searchConfig, _get(config, 'searchConfig'));
  Object.freeze(searchConfig);
}

export { invenioConfig } from './invenioConfig';
export { getSearchConfig } from './searchConfig';
export { uiConfig } from './uiConfig';
