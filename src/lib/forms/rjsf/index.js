import { sendSuccessNotification } from '@components/Notifications';
import { connect } from 'react-redux';
import { RJSForm as RJSFormComponent } from './RJSForm';

const mapDispatchToProps = (dispatch) => ({
  sendSuccessNotification: (title, content) =>
    dispatch(sendSuccessNotification(title, content)),
});

export const RJSForm = connect(null, mapDispatchToProps)(RJSFormComponent);
