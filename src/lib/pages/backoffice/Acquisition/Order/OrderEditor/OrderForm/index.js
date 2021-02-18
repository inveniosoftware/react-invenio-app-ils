import {
  sendErrorNotification,
  sendSuccessNotification,
} from '@components/Notifications/actions';
import { connect } from 'react-redux';
import { OrderForm as OrderFormComponent } from './OrderForm';

const mapDispatchToProps = (dispatch) => ({
  sendSuccessNotification: (title, content) =>
    dispatch(sendSuccessNotification(title, content)),
  sendErrorNotification: (title, content) =>
    dispatch(sendErrorNotification(title, content)),
});

export const OrderForm = connect(null, mapDispatchToProps)(OrderFormComponent);
