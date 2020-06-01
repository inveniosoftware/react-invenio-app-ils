import React from 'react';
import PropTypes from 'prop-types';
import { Header } from 'semantic-ui-react';

export const SeriesTitle = ({ title, modeOfIssuance }) => (
  <>
    {modeOfIssuance.toUpperCase()}
    <Header as="h2">{title}</Header>
  </>
);

SeriesTitle.propTypes = {
  title: PropTypes.string.isRequired,
  modeOfIssuance: PropTypes.string.isRequired,
};
