import { sendErrorNotification } from '@components/Notifications';
import { connect } from 'react-redux';
import { BorrowingRequestForm as BorrowingRequestFormComponent } from './BorrowingRequestForm';

const mapDispatchToProps = (dispatch) => ({
  sendErrorNotification: (title, content) =>
    dispatch(sendErrorNotification(title, content)),
});

export const BorrowingRequestForm = connect(
  null,
  mapDispatchToProps
)(BorrowingRequestFormComponent);
