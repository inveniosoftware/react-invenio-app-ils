import { connect } from 'react-redux';
import ImporterComponent from './Importer';
import { postData } from './state/actions';

const mapStateToProps = state => ({
  data: state.importer.data,
  isLoading: state.importer.isLoading,
  error: state.importer.error,
  hasError: state.importer.hasError,
});

const mapDispatchToProps = dispatch => ({
  postData: formdata => dispatch(postData(formdata)),
});

export const Importer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ImporterComponent);
