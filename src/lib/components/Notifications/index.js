import { connect } from 'react-redux';
import NotificationsComponent from './Notifications';
import { REMOVE } from './actions';
export {
  addNotification,
  sendErrorNotification,
  sendSuccessNotification,
} from '@components/Notifications/actions';

const mapStateToProps = (state) => ({
  notifications: state.notifications.notifications,
});

const mapDispatchToProps = (dispatch) => ({
  removeNotification: (notificationId) =>
    dispatch({
      type: REMOVE,
      payload: notificationId,
    }),
});

export const Notifications = connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsComponent);
