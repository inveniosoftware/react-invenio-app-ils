import { LiteratureAccessUrls } from '@modules/Literature/LiteratureAccessUrls';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React from 'react';
import { Divider } from 'semantic-ui-react';
import { SeriesUrls } from './SeriesUrls';

export const SeriesLinks = ({ accessUrls, urls }) => {
  return _isEmpty(accessUrls) && _isEmpty(urls) ? (
    'No links'
  ) : (
    <>
      <Divider horizontal>Access online</Divider>
      <LiteratureAccessUrls urls={accessUrls} />
      <Divider horizontal>Links</Divider>
      <SeriesUrls url={urls} />
    </>
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
