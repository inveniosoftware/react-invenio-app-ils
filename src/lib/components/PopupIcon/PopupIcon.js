/*
 * SPDX-FileCopyrightText: 2026 CERN.
 * SPDX-License-Identifier: MIT
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Popup, Icon } from 'semantic-ui-react';

export const PopupIcon = ({
  content,
  icon,
  ariaLabel,
  iconProps,
  triggerChildren,
  ...popupProps
}) => (
  <Popup
    content={content}
    on={['hover', 'focus']}
    trigger={
      <span>
        {triggerChildren}
        <Icon
          name={icon}
          role="button"
          tabIndex={0}
          aria-label={
            ariaLabel ||
            (typeof content === 'string' ? content : 'More information')
          }
          {...iconProps}
        />
      </span>
    }
    {...popupProps}
  />
);

PopupIcon.propTypes = {
  content: PropTypes.node.isRequired,
  icon: PropTypes.string,
  // required when content is not a plain string
  ariaLabel: PropTypes.string,
  iconProps: PropTypes.object,
  triggerChildren: PropTypes.node,
};

PopupIcon.defaultProps = {
  icon: 'info circle',
  ariaLabel: null,
  iconProps: {},
  triggerChildren: null,
};
