import { sendErrorNotification } from '@components/Notifications';
import { connect } from 'react-redux';
import { DocumentForm as DocumentFormComponent } from './DocumentForm';

const mapDispatchToProps = (dispatch) => ({
  sendErrorNotification: (title, content) =>
    dispatch(sendErrorNotification(title, content)),
});

export const DocumentForm = connect(
  null,
  mapDispatchToProps
)(DocumentFormComponent);
