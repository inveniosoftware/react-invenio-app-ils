import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { authenticationReducer } from '@authentication/reducer';
import { notificationsReducer } from '@components/Notifications/reducer';

const rootReducer = combineReducers({
  authenticationManagement: authenticationReducer,
  notifications: notificationsReducer,
});

const composeEnhancers = composeWithDevTools({
  name: 'ILS Backoffice',
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
