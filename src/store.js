import { loanDetailsReducer, loanActionReducer } from '@modules/Loan/reducer';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { authenticationReducer } from '@authentication/reducer';
import { notificationsReducer } from '@components/Notifications/reducer';
import { documentDetailsFrontReducer } from '@pages/frontsite/Documents/DocumentDetails/reducer';
import { loanRequestFormReducer } from '@pages/frontsite/Documents/DocumentDetails/LoanRequestForm/reducer';
import { seriesDetailsFrontReducer } from '@pages/frontsite/Series/SeriesDetails/reducer';
import {
  patronCurrentLoansReducer,
  patronDocumentRequestsReducer,
  patronPastLoansReducer,
  patronPendingLoansReducer,
  patronCurrentBorrowingRequestsReducer,
  patronPastBorrowingRequestsReducer,
} from '@modules/Patron';
import {
  patronCurrentDocumentRequestsReducer,
  patronPastDocumentRequestsReducer,
} from '@pages/frontsite/PatronProfile/reducer';
import { staticPageReducer } from '@pages/frontsite/StaticPage/reducer';
import {
  loansCardReducer,
  documentCardReducer,
  overbookedDocumentsReducer,
  overdueLoansReducer,
  pendingOverdueDocumentsReducer,
  idleLoansReducer,
  renewedLoansReducer,
} from '@pages/backoffice/Home/reducer';
import { overdueLoanSendMailModalReducer } from '@modules/Loan/backoffice/OverdueLoanSendMailModal/reducer';
import { availableItemsReducer } from '@pages/backoffice/Loan/LoanDetails/reducer';
import { documentRequestDetailsReducer } from '@pages/backoffice/DocumentRequest/DocumentRequestDetails/reducer';
import {
  locationListReducer,
  internalLocationListReducer,
} from '@pages/backoffice/Location/LocationList/reducer';
import { deleteRecordModalReducer } from '@components/backoffice/DeleteRecordModal/reducer';
import {
  documentDetailsReducer,
  documentStatsReducer,
  documentPendingLoans,
  documentItems,
  documentEItems,
} from '@pages/backoffice/Document/DocumentDetails/reducer';
import { recordRelationsReducer } from '@modules/Relations/backoffice/reducer';
import { relationSelectorReducer } from '@modules/Relations/backoffice/reducer';
import {
  seriesDetailsReducer,
  seriesDocumentsReducer,
  seriesMultipartMonographsReducer,
  seriesRelationsReducer,
} from '@pages/backoffice/Series/SeriesDetails/reducer';
import {
  itemDetailsReducer,
  itemPastLoansReducer,
} from '@pages/backoffice/Item/ItemDetails/reducer';
import { eitemDetailsReducer } from '@pages/backoffice/EItem/EItemDetails/reducer';
import {
  orderDetailsReducer,
  vendorDetailsReducer,
} from '@pages/backoffice/Acquisition';
import {
  borrowingRequestDetailsReducer,
  libraryDetailsReducer,
} from '@pages/backoffice/ILL';
import { borrowingRequestPatronLoanCreateReducer } from '@pages/backoffice/ILL/BorrowingRequest/BorrowingRequestDetails/BorrowingRequestPatronLoan/reducer';

const rootReducer = combineReducers({
  authenticationManagement: authenticationReducer,
  notifications: notificationsReducer,
  /* frontsite */
  documentDetailsFront: documentDetailsFrontReducer,
  loanRequestForm: loanRequestFormReducer,
  seriesDetailsFront: seriesDetailsFrontReducer,
  patronCurrentLoans: patronCurrentLoansReducer,
  patronDocumentRequests: patronDocumentRequestsReducer,
  patronPastDocumentRequests: patronPastDocumentRequestsReducer,
  patronCurrentDocumentRequests: patronCurrentDocumentRequestsReducer,
  patronPastLoans: patronPastLoansReducer,
  patronPendingLoans: patronPendingLoansReducer,
  patronCurrentBorrowingRequests: patronCurrentBorrowingRequestsReducer,
  patronPastBorrowingRequests: patronPastBorrowingRequestsReducer,
  staticPage: staticPageReducer,

  /* backoffice */
  loansCard: loansCardReducer,
  documentCard: documentCardReducer,
  overbookedDocuments: overbookedDocumentsReducer,
  overdueLoans: overdueLoansReducer,
  pendingOverdueDocuments: pendingOverdueDocumentsReducer,
  idlePendingLoans: idleLoansReducer,
  latestRenewedLoans: renewedLoansReducer,
  overdueLoanSendMailModal: overdueLoanSendMailModalReducer,
  loanDetails: loanDetailsReducer,
  loanActions: loanActionReducer,
  availableItems: availableItemsReducer,
  documentRequestDetails: documentRequestDetailsReducer,
  locations: locationListReducer,
  internalLocations: internalLocationListReducer,
  deleteRecordModal: deleteRecordModalReducer,
  recordRelationsSelections: relationSelectorReducer,
  recordRelations: recordRelationsReducer,
  documentDetails: documentDetailsReducer,
  documentItems: documentItems,
  documentEItems: documentEItems,
  documentPendingLoans: documentPendingLoans,
  documentStats: documentStatsReducer,
  seriesDetails: seriesDetailsReducer,
  seriesDocuments: seriesDocumentsReducer,
  seriesMultipartMonographs: seriesMultipartMonographsReducer,
  seriesRelations: seriesRelationsReducer,
  itemDetails: itemDetailsReducer,
  itemPastLoans: itemPastLoansReducer,
  eitemDetails: eitemDetailsReducer,
  orderDetails: orderDetailsReducer,
  vendorDetails: vendorDetailsReducer,
  borrowingRequestDetails: borrowingRequestDetailsReducer,
  borrowingRequestPatronLoanCreate: borrowingRequestPatronLoanCreateReducer,
  libraryDetails: libraryDetailsReducer,
});

const composeEnhancers = composeWithDevTools({
  name: 'ILS Backoffice',
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
