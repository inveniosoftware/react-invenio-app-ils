import { addNotification } from '@components/Notifications';
import { connect } from 'react-redux';
import { deleteFile, uploadFile } from '../File/state/actions';

import EItemFilesComponent from './EItemFiles';

const mapStateToProps = (state) => ({
  eitemDetails: state.eitemDetails.data,
  files: state.eitemDetails.files,
  error: state.eitemDetails.error,
  isEItemFilesLoading: state.eitemDetails.isFilesLoading,
});

const mapDispatchToProps = (dispatch) => ({
  sendErrorNotification: (title, message) =>
    dispatch(addNotification(title, message, 'error')),
  deleteFile: (bucket, filename) => dispatch(deleteFile(bucket, filename)),
  uploadFile: (eitemPid, bucket, file) =>
    dispatch(uploadFile(eitemPid, bucket, file)),
});

export const EItemFiles = connect(
  mapStateToProps,
  mapDispatchToProps
)(EItemFilesComponent);
