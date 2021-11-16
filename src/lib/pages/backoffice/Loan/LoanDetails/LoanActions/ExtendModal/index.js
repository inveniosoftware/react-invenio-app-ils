import { addNotification } from '@components/Notifications';
import { connect } from 'react-redux';
import ExtendModalComponent from './ExtendModal';

const mapDispatchToProps = (dispatch) => ({
  sendErrorNotification: (title, message) =>
    dispatch(addNotification(title, message, 'error')),
});

export const ExtendModal = connect(
  null,
  mapDispatchToProps
)(ExtendModalComponent);
