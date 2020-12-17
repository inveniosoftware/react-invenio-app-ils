import { connect } from 'react-redux';
import { sendSuccessNotification } from '@components/Notifications/actions';
import { VendorForm as VendorFormComponent } from './VendorForm';

const mapDispatchToProps = (dispatch) => ({
  sendSuccessNotification: (title, content) =>
    dispatch(sendSuccessNotification(title, content)),
});

export const VendorForm = connect(
  null,
  mapDispatchToProps
)(VendorFormComponent);
