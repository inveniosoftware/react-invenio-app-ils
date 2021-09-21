import { http } from '@api/base';
import { getSearchTotal, prepareSumQuery } from '@api/utils';

const apiPaths = {
  list: '/notifications',
};

class QueryBuilder {
  constructor() {
    this.recipientUserIdQuery = '';
    this.pidTypeQuery = '';
    this.pidValueQuery = '';
    this.notificationActionQuery = '';
    this.size = '';
  }

  withRecipientUserId(recipientUserId) {
    if (!recipientUserId) {
      throw TypeError('recipientUserId argument missing');
    }
    this.recipientUserIdQuery = `recipient_user_id=${prepareSumQuery(
      recipientUserId
    )}`;
    return this;
  }

  withPidType(pidType) {
    if (!pidType) {
      throw TypeError('pidType argument missing');
    }
    this.pidTypeQuery = `pid_type=${prepareSumQuery(pidType)}`;
    return this;
  }

  withPidValue(pidValue) {
    if (!pidValue) {
      throw TypeError('pidValue argument missing');
    }
    this.pidValueQuery = `pid_value=${prepareSumQuery(pidValue)}`;
    return this;
  }

  withNotificationAction(notificationAction) {
    if (!notificationAction) {
      throw TypeError('notificationAction argument missing');
    }
    this.notificationActionQuery = `action=${prepareSumQuery(
      notificationAction
    )}`;
    return this;
  }

  withSize(size) {
    if (size > 0) this.size = `&size=${size}`;
    return this;
  }

  qs() {
    return `${this.size}&${this.notificationActionQuery}&${this.pidTypeQuery}&${this.pidValueQuery}&${this.recipientUserIdQuery}`;
  }
}

const queryBuilder = () => {
  return new QueryBuilder();
};

const list = async (query) => {
  const response = await http.get(`${apiPaths.list}?q=${query}`);
  response.data.total = getSearchTotal(response.data.hits);
  response.data = response.data.hits;
  return response;
};

export const notificationsApi = {
  list: list,
  query: queryBuilder,
};
