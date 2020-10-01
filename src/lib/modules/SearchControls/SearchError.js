import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import { EmailLink } from '@components/EmailLink';
import { invenioConfig } from '@config';
import { SearchMessage } from '@modules/SearchControls/SearchMessage';

export const SearchError = ({ error }) => {
  if (_get(error, 'response.status') === 400) {
    return (
      <SearchMessage title="Unrecognized search query." icon="question">
        The query you entered was not recognized.
      </SearchMessage> // When implemented, add link to documentation
    );
  } else {
    return (
      <SearchMessage
        title="Something went wrong while fetching results."
        icon="warning"
      >
        Please try again later. If the problem persists,{' '}
        <EmailLink email={invenioConfig.APP.supportEmail}>
          contact the technical support
        </EmailLink>
        .
      </SearchMessage>
    );
  }
};

SearchError.propTypes = {
  error: PropTypes.object.isRequired,
};
