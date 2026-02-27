import { logout } from '@authentication/state/actions';
import { addNotification } from '@components/Notifications';
import { connect } from 'react-redux';
import SidebarComponent from './Sidebar';

const mapStateToProps = (state: any) => ({
  user: state.authenticationManagement.data,
});

const mapDispatchToProps = (dispatch: any) => ({
  sendErrorNotification: (title: string, content: string) =>
    dispatch(addNotification(title, content, 'error')),
  logout: () => dispatch(logout()),
});

export const Sidebar = connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarComponent);

export { default as AdminMenu } from './AdminMenu';
