import { getStaticPageByName } from '@config';
import { SearchMessage } from '@modules/SearchControls/SearchMessage';
import _get from 'lodash/get';
import PropTypes from 'prop-types';
import React from 'react';
import Overridable from 'react-overridable';
import { Link } from 'react-router-dom';
import { Header } from 'semantic-ui-react';

export const SearchError = ({ error }) => {
  if (_get(error, 'response.status') === 400) {
    return (
      <SearchMessage title="Unrecognized search query." icon="question">
        The query you entered was not recognized.
      </SearchMessage> // When implemented, add link to documentation
    );
  } else {
    return (
      <Overridable id="SearchError.layout">
        <SearchMessage
          title="Something went wrong while fetching results."
          icon="warning"
        >
          <Header.Subheader>
            Please try again later. If the problem persists,{' '}
            <Link to={getStaticPageByName('contact').route}>contact us</Link>.
          </Header.Subheader>
        </SearchMessage>
      </Overridable>
    );
  }
};

SearchError.propTypes = {
  error: PropTypes.object.isRequired,
};
