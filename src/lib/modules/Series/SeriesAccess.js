import { ILSImagePlaceholder } from '@components/ILSPlaceholder';
import { LiteratureAccessUrls } from '@modules/Literature/LiteratureAccessUrls';
import PropTypes from 'prop-types';
import React from 'react';
import { Header, Segment } from 'semantic-ui-react';

export const SeriesAccess = ({ urls, isLoading }) => {
  return (
    <Segment className="highlighted">
      <ILSImagePlaceholder style={{ height: 200 }} isLoading={isLoading}>
        <Header as="h3">Access online</Header>
        <LiteratureAccessUrls urls={urls} truncate />
        <br />
        It's not possible to loan an entire series, but you can loan individual
        volumes.
        <br />
        Please see the list of available volumes and periodical issues below.
      </ILSImagePlaceholder>
    </Segment>
  );
};

SeriesAccess.propTypes = {
  urls: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
};

SeriesAccess.defaultProps = {
  urls: [],
  isLoading: false,
};
