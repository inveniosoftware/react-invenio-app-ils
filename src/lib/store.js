import { authenticationReducer } from '@authentication/reducer';
import { deleteRecordModalReducer } from '@components/backoffice/DeleteRecordModal/reducer';
import { notificationsReducer } from '@components/Notifications/reducer';
import { overdueLoanSendMailModalReducer } from '@modules/Loan/backoffice/OverdueLoanSendMailModal/reducer';
import { loanActionReducer, loanDetailsReducer } from '@modules/Loan/reducer';
import patronCurrentBorrowingRequestsReducer from '@modules/Patron/PatronCurrentBorrowingRequests/reducer';
import patronCurrentLoansReducer from '@modules/Patron/PatronCurrentLoans/reducer';
import patronDocumentRequestsReducer from '@modules/Patron/PatronDocumentRequests/reducer';
import patronPastBorrowingRequestsReducer from '@modules/Patron/PatronPastBorrowingRequests/reducer';
import patronPastLoansReducer from '@modules/Patron/PatronPastLoans/reducer';
import patronPendingLoansReducer from '@modules/Patron/PatronPendingLoans/reducer';
import {
  recordRelationsReducer,
  relationSelectorReducer,
} from '@modules/Relations/backoffice/reducer';
import orderDetailsReducer from '@pages/backoffice/Acquisition/Order/OrderDetails/state/reducer';
import vendorDetailsReducer from '@pages/backoffice/Acquisition/Vendor/VendorDetails/state/reducer';
import {
  documentDetailsReducer,
  documentEItems,
  documentItems,
  documentPendingLoans,
  documentStatsReducer,
} from '@pages/backoffice/Document/DocumentDetails/reducer';
import { documentRequestDetailsReducer } from '@pages/backoffice/DocumentRequest/DocumentRequestDetails/reducer';
import { eitemDetailsFileReducer } from '@pages/backoffice/EItem/EItemDetails/File/reducer';
import { eitemDetailsReducer } from '@pages/backoffice/EItem/EItemDetails/reducer';
import {
  documentCardReducer,
  idleLoansReducer,
  loansCardReducer,
  overbookedDocumentsReducer,
  overdueLoansReducer,
  pendingOverdueDocumentsReducer,
  renewedLoansReducer,
} from '@pages/backoffice/Home/reducer';
import { borrowingRequestLoanExtensionReducer } from '@pages/backoffice/ILL/BorrowingRequest/BorrowingRequestDetails/BorrowingRequestPatronLoan/BorrowingRequestLoanExtension/reducer';
import { borrowingRequestPatronLoanCreateReducer } from '@pages/backoffice/ILL/BorrowingRequest/BorrowingRequestDetails/BorrowingRequestPatronLoan/reducer';
import borrowingRequestDetailsReducer from '@pages/backoffice/ILL/BorrowingRequest/BorrowingRequestDetails/state/reducer';
import libraryDetailsReducer from '@pages/backoffice/ILL/Library/LibraryDetails/state/reducer';
import {
  itemDetailsReducer,
  itemPastLoansReducer,
} from '@pages/backoffice/Item/ItemDetails/reducer';
import { availableItemsReducer } from '@pages/backoffice/Loan/LoanDetails/reducer';
import {
  internalLocationListReducer,
  locationListReducer,
} from '@pages/backoffice/Location/LocationList/reducer';
import {
  itemsSearchByBarcodeReducer,
  patronDetailsReducer,
  patronItemCheckoutReducer,
} from '@pages/backoffice/Patron/PatronDetails/reducer';
import {
  seriesDetailsReducer,
  seriesDocumentsReducer,
  seriesMultipartMonographsReducer,
  seriesRelationsReducer,
} from '@pages/backoffice/Series/SeriesDetails/reducer';
import { mostLoanedDocumentsReducer } from '@pages/backoffice/Stats/reducer';
import { loanRequestFormReducer } from '@pages/frontsite/Documents/DocumentDetails/LoanRequestForm/reducer';
import { documentDetailsFrontReducer } from '@pages/frontsite/Documents/DocumentDetails/reducer';
import {
  patronCurrentDocumentRequestsReducer,
  patronPastDocumentRequestsReducer,
} from '@pages/frontsite/PatronProfile/reducer';
import { seriesDetailsFrontReducer } from '@pages/frontsite/Series/SeriesDetails/reducer';
import { staticPageReducer } from '@pages/frontsite/StaticPage/reducer';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

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
  eitemDetailsFile: eitemDetailsFileReducer,
  orderDetails: orderDetailsReducer,
  vendorDetails: vendorDetailsReducer,
  borrowingRequestDetails: borrowingRequestDetailsReducer,
  borrowingRequestPatronLoanCreate: borrowingRequestPatronLoanCreateReducer,
  libraryDetails: libraryDetailsReducer,
  patronDetails: patronDetailsReducer,
  itemsSearchInput: itemsSearchByBarcodeReducer,
  patronItemsCheckout: patronItemCheckoutReducer,
  statsMostLoanedDocuments: mostLoanedDocumentsReducer,
  borrowingRequestLoanExtension: borrowingRequestLoanExtensionReducer,
});

const composeEnhancers = composeWithDevTools({
  name: 'InvenioILS',
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
