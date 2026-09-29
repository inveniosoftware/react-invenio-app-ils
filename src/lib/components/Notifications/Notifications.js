/*
 * SPDX-FileCopyrightText: 2020-2021 CERN.
 * SPDX-License-Identifier: MIT
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage, SuccessMessage, WarningMessage } from './messages';

export default class Notifications extends Component {
  renderMessageContent = (notification) => {
    const { content, link, linkDisplayName } = notification;

    if (link && linkDisplayName) {
      const [before, after] = content.split(linkDisplayName);

      return (
        <>
          {before}
          <a
            className="notification-link"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {linkDisplayName}
          </a>
          {after}
        </>
      );
    } else return content;
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
