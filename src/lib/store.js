import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { default as createILSReducer } from './reducers';
import thunk from 'redux-thunk';

const composeEnhancers = composeWithDevTools({
  name: 'InvenioILS',
});

/**
 *  ILS Store can be configured separately
 *  @returns {Object} store
 */
export function configureStore() {
  const store = createStore(
    createILSReducer(),
    composeEnhancers(applyMiddleware(thunk))
  );
  store.asyncReducers = {};
  return store;
}

export function injectAsyncReducer(store, name, asyncReducer) {
  store.asyncReducers[name] = asyncReducer;
  store.replaceReducer(createILSReducer(store.asyncReducers));
}
