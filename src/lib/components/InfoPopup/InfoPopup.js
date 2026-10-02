/*
 * SPDX-FileCopyrightText: 2020-2021 CERN.
 * SPDX-License-Identifier: MIT
 */

import React from 'react';
import PropTypes from 'prop-types';
import { PopupIcon } from '@components/PopupIcon';

export const InfoPopup = ({ children, message }) => {
  return (
    <span className="info-popup">
      <PopupIcon
        content={message}
        icon="question circle outline"
        iconProps={{ color: 'grey' }}
        wide="very"
        triggerChildren={children}
      />
    </span>
  );
};

InfoPopup.propTypes = {
  children: PropTypes.node,
  message: PropTypes.string.isRequired,
};

InfoPopup.defaultProps = {
  children: null,
};
