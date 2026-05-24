/*
 * SPDX-FileCopyrightText: 2020 CERN.
 * SPDX-License-Identifier: MIT
 */

import React from 'react';
import PropTypes from 'prop-types';

export const AvailableLoanBucketAggregationElement = ({ containerCmp }) => {
  return <div>{containerCmp}</div>;
};

AvailableLoanBucketAggregationElement.propTypes = {
  containerCmp: PropTypes.node.isRequired,
};
