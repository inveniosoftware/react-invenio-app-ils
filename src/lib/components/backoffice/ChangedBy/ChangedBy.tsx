/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import { BackOfficeRoutes } from '@routes/urls';
import { PatronIcon } from '@components/backoffice/icons';
import _get from 'lodash/get';

interface ChangedByProps {
  metadata: Record<string, any>;
  field: string;
}

const ChangedBy: React.FC<ChangedByProps> = ({ metadata, field }) => {
  const byType = _get(metadata, `${field}.type`);
  const byValue = _get(metadata, `${field}.value`, '-');

  if (!byType) {
    return byValue;
  } else {
    switch (byType) {
      case 'user_id':
        return byValue > 0 ? (
          <Link to={BackOfficeRoutes.patronDetailsFor(byValue)}>
            <PatronIcon /> {byValue}
          </Link>
        ) : (
          <>
            <PatronIcon /> anonymous
          </>
        );
      default:
        return `${byType}:${byValue}`;
    }
  }
};

interface CreatedByProps {
  metadata: Record<string, any>;
}

export const CreatedBy: React.FC<CreatedByProps> = ({ metadata }) => {
  return <ChangedBy metadata={metadata} field="created_by" />;
};

interface UpdatedByProps {
  metadata: Record<string, any>;
}

export const UpdatedBy: React.FC<UpdatedByProps> = ({ metadata }) => {
  return <ChangedBy metadata={metadata} field="updated_by" />;
};
