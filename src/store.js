import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { authenticationReducer } from '@authentication/reducer';
import { notificationsReducer } from '@components/Notifications/reducer';
import { documentDetailsFrontReducer } from '@pages/frontsite/Documents/DocumentDetails/reducer';
import { loanRequestFormReducer } from '@pages/frontsite/Documents/DocumentDetails/LoanRequestForm/reducer';

const rootReducer = combineReducers({
  authenticationManagement: authenticationReducer,
  notifications: notificationsReducer,
  documentDetailsFront: documentDetailsFrontReducer,
  loanRequestForm: loanRequestFormReducer,
});

const composeEnhancers = composeWithDevTools({
  name: 'ILS Backoffice',
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
