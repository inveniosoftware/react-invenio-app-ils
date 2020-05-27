import { connect } from 'react-redux';
import { fetchRequestedWithAvailableItems } from './state/actions';
import DocumentsCardComponent from './DocumentCard';

const mapStateToProps = state => ({
  data: state.documentCard.data,
  error: state.documentCard.error,
  isLoading: state.documentCard.isLoading,
  hasError: state.documentCard.hasError,
});

const mapDispatchToProps = dispatch => ({
  fetchRequestedWithAvailableItems: () =>
    dispatch(fetchRequestedWithAvailableItems()),
});

export const DocumentCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentsCardComponent);
