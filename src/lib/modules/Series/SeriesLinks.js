import React from 'react';
import PropTypes from 'prop-types';
import { Divider } from 'semantic-ui-react';
import _isEmpty from 'lodash/isEmpty';
import { InfoMessage } from '@components/InfoMessage';
import { SeriesAccessUrls } from './SeriesAccessUrls';
import { SeriesUrls } from './SeriesUrls';

export const SeriesLinks = ({ accessUrls, urls }) => {
  return (
    <InfoMessage
      show={!(_isEmpty(accessUrls) && _isEmpty(urls))}
      message="There are no links for this series."
    >
      <Divider horizontal>Access online</Divider>
      <SeriesAccessUrls urls={accessUrls} />
      <Divider horizontal>Links</Divider>
      <SeriesUrls url={urls} />
    </InfoMessage>
  );
};

SeriesLinks.propTypes = {
  accessUrls: PropTypes.array,
  urls: PropTypes.array,
};

SeriesLinks.defaultProps = {
  accessUrls: [],
  urls: [],
};
