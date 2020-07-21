import React from 'react';
import PropTypes from 'prop-types';
import { Header } from 'semantic-ui-react';
import _isEmpty from 'lodash/isEmpty';

export const SeriesTitle = ({ title, subtitle, modeOfIssuance }) => (
  <>
    {modeOfIssuance.toUpperCase()}
    <Header as="h2" className="document-title">
      {title}
      {!_isEmpty(subtitle) && <Header.Subheader>{subtitle}</Header.Subheader>}
    </Header>
  </>
);

SeriesTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  modeOfIssuance: PropTypes.string.isRequired,
};

SeriesTitle.defaultProps = {
  subtitle: undefined,
};
