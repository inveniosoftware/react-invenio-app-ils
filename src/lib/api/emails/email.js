import { http } from '@api/base';
import { prepareSumQuery } from '@api/utils';

const apiPaths = {
  list: '/emails',
};

class QueryBuilder {
  constructor() {
    this.recipientUserIdQuery = '';
    this.pidTypeQuery = '';
    this.pidValueQuery = '';
    this.emailActionQuery = '';
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

  withEmailAction(emailAction) {
    if (!emailAction) {
      throw TypeError('emailAction argument missing');
    }
    this.emailActionQuery = `email_action=${prepareSumQuery(emailAction)}`;
    return this;
  }

  withSize(size) {
    if (size > 0) this.size = `&size=${size}`;
    return this;
  }

  qs() {
    return `${this.size}&${this.emailActionQuery}&${this.pidTypeQuery}&${this.pidValueQuery}&${this.recipientUserIdQuery}`;
  }
}

const queryBuilder = () => {
  return new QueryBuilder();
};

const list = async (query) => {
  const response = await http.get(`${apiPaths.list}?q=${query}`);
  response.data.total = response.data.hits.total;
  response.data = response.data.hits;
  return response;
};

export const emailApi = {
  list: list,
  query: queryBuilder,
};
