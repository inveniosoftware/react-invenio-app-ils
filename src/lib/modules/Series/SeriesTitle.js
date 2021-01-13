import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React from 'react';
import Truncate from 'react-truncate';
import { Header } from 'semantic-ui-react';

export const SeriesTitle = ({ title, subtitle, modeOfIssuance }) => (
  <>
    {modeOfIssuance.toUpperCase()}
    <Header as="h2" className="document-title">
      <Truncate lines={10} ellipsis="... ">
        {title}
      </Truncate>
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
