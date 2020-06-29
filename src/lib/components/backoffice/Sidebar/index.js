import { connect } from 'react-redux';
import SidebarComponent from './Sidebar';

const mapStateToProps = state => ({
  user: state.authenticationManagement.data,
});

export const Sidebar = connect(mapStateToProps, null)(SidebarComponent);
