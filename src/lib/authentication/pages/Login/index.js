import { connect } from 'react-redux';
import { fetchUserProfile } from '@authentication/state/actions';
import LoginComponent from './Login';

const mapStateToProps = (state) => ({
  user: state.authenticationManagement.data,
  isAnonymous: state.authenticationManagement.isAnonymous,
  isLoading: state.authenticationManagement.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserProfile: () => dispatch(fetchUserProfile()),
});

export const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);
