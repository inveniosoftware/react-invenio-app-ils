import { performLoanAction } from '@modules/Loan/actions';
import { connect } from 'react-redux';
import { fetchPendingLoans } from './../../../Document/DocumentDetails/DocumentPendingLoans/state/actions';
import ItemPendingLoansComponent from './ItemPendingLoans';

const mapStateToProps = state => ({
  data: state.documentPendingLoans.data,
  itemDetails: state.itemDetails.data,
  error: state.documentPendingLoans.error,
  isLoading: state.documentPendingLoans.isLoading,
  hasError: state.documentPendingLoans.hasError,
  isPendingLoansLoading: state.loanActions.isLoading,
});
const mapDispatchToProps = dispatch => ({
  fetchPendingLoans: documentPid => dispatch(fetchPendingLoans(documentPid)),
  performCheckoutAction: (
    url,
    documentPid,
    patronPid,
    itemPid,
    shouldFetchItemDetails
  ) =>
    dispatch(
      performLoanAction(url, documentPid, patronPid, {
        itemPid: itemPid,
        shouldFetchItemDetails: shouldFetchItemDetails,
      })
    ),
});

export const ItemPendingLoans = connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemPendingLoansComponent);
