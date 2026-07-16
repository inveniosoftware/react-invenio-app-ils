/*
 * SPDX-FileCopyrightText: 2020-2021 CERN.
 * SPDX-License-Identifier: MIT
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage, SuccessMessage, WarningMessage } from './messages';

export default class Notifications extends Component {
  renderMessageContent = (notification) => {
    const [before, after] = notification.content.split(
      notification.linkDisplayName
    );

    if (notification.link && notification.linkDisplayName) {
      return (
        <>
          {before}
          <a
            style={{ textDecoration: 'underline' }}
            href={notification.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {notification.linkDisplayName}
          </a>
          {after}
        </>
      );
    } else return notification.content;
  };

  renderNotification(notification) {
    const { removeNotification } = this.props;

    let MessageComponent = ErrorMessage;
    if (notification.type === 'success') {
      MessageComponent = SuccessMessage;
    } else if (notification.type === 'warning') {
      MessageComponent = WarningMessage;
    }

    return (
      <MessageComponent
        id={notification.id}
        key={notification.id}
        header={notification.title}
        content={this.renderMessageContent(notification)}
        removeNotification={removeNotification}
      />
    );
  }

  render() {
    const { notifications, className } = this.props;
    return (
      <div id="notifications" className={className}>
        {notifications.map((message) => this.renderNotification(message))}
      </div>
    );
  }
}

Notifications.propTypes = {
  className: PropTypes.string,
  /* Redux */
  notifications: PropTypes.array,
  removeNotification: PropTypes.func.isRequired,
};

Notifications.defaultProps = {
  notifications: [],
  className: '',
};
