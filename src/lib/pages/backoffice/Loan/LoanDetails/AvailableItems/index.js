import { addNotification } from '@components/Notifications';
import { connect } from 'react-redux';
import { assignItemToLoan, fetchAvailableItems } from './state/actions';
import { performLoanAction } from '@modules/Loan/actions';
import AvailableItemsComponent from './AvailableItems';

const mapStateToProps = (state) => ({
  data: state.availableItems.data,
  error: state.availableItems.error,
  isLoading: state.availableItems.isLoading,
  isActionLoading: state.loanActions.isLoading,
  hasError: state.availableItems.hasError,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAvailableItems: (documentPid) =>
    dispatch(fetchAvailableItems(documentPid)),
  assignItemToLoan: (itemPid, loanPid) =>
    dispatch(assignItemToLoan(itemPid, loanPid)),
  performCheckoutAction: (url, documentPid, patronPid, itemPid) =>
    dispatch(
      performLoanAction(url, documentPid, patronPid, { itemPid: itemPid })
    ),
  sendErrorNotification: (title, content) =>
    dispatch(addNotification(title, content, 'error')),
});

export const AvailableItems = connect(
  mapStateToProps,
  mapDispatchToProps
)(AvailableItemsComponent);
