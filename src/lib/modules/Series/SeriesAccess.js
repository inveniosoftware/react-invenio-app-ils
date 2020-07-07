import PropTypes from 'prop-types';
import React from 'react';
import { Header, Segment } from 'semantic-ui-react';
import { SeriesAccessUrls } from './SeriesAccessUrls';

export const SeriesAccess = ({ urls }) => {
  return (
    <Segment className="highlighted">
      <Header as="h3">Access online</Header>
      <SeriesAccessUrls url={urls} truncate />
      <br />
      It's not possible to loan an entire series, but you can loan individual
      volumes.
      <br />
      Please see the list of available volumes and periodical issues below.
    </Segment>
  );
};

SeriesAccess.propTypes = {
  urls: PropTypes.arrayOf(PropTypes.object),
};

SeriesAccess.defaultProps = {
  urls: [],
};
