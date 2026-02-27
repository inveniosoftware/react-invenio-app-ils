import { connect } from 'react-redux';
import { fetchReferences } from './state/actions';
import DeleteRecordModalComponent from './DeleteRecordModal';

const mapStateToProps = (state: any) => ({
  data: state.deleteRecordModal.data,
  error: state.deleteRecordModal.error,
  isLoading: state.deleteRecordModal.isLoading,
  hasError: state.deleteRecordModal.hasError,
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchReferences: (promiseArray: any) =>
    dispatch(fetchReferences(promiseArray)),
});

export const DeleteRecordModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteRecordModalComponent);
