import React from 'react';
import { Truncate } from '@components/Truncate';
import _find from 'lodash/find';

export const renderSubtitle = (alternativeTitles) => {
  const subtitle = _find(alternativeTitles, { type: 'SUBTITLE' });
  return subtitle ? <Truncate>{subtitle.value}</Truncate> : null;
};
