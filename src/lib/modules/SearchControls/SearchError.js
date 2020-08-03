import { Header, Icon, Segment } from 'semantic-ui-react';
import React from 'react';
import PropTypes from 'prop-types';

export const SearchError = ({ error }) => {
  return (
    <Segment placeholder textAlign="center">
      <Header icon>
        <Icon name="warning" />
        Oups! Something went wrong while fetching results.
      </Header>
      <Header.Subheader>
        Please try again later. If the problem persists, contact the technical
        support.
      </Header.Subheader>
    </Segment>
  );
};

SearchError.propTypes = {
  error: PropTypes.object.isRequired,
};
