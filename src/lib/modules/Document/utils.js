import React from 'react';
import { Truncate } from '@components/Truncate';
import find from 'lodash/find';
import _isEmpty from 'lodash/isEmpty';

export const renderSubtitle = (alternativeTitles) => {
  if (_isEmpty(alternativeTitles)) {
    return null;
  }
  const subtitle = find(alternativeTitles, { type: 'SUBTITLE' });
  return subtitle ? <Truncate>{subtitle.value}</Truncate> : null;
};
