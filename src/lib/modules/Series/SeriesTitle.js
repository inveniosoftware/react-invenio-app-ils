import { Truncate } from '@components/Truncate';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React from 'react';
import { Header } from 'semantic-ui-react';

export const SeriesTitle = ({
  title,
  subtitle,
  modeOfIssuance,
  truncate,
  truncateLines,
  truncateWidth,
}) => (
  <>
    {modeOfIssuance.toUpperCase()}
    <Header as="h2" className="document-title">
      {truncate ? (
        <Truncate lines={truncateLines} width={truncateWidth}>
          {title}
        </Truncate>
      ) : (
        title
      )}
      {!_isEmpty(subtitle) && <Header.Subheader>{subtitle}</Header.Subheader>}
    </Header>
  </>
);

SeriesTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  modeOfIssuance: PropTypes.string.isRequired,
  truncate: PropTypes.bool,
  truncateLines: PropTypes.number,
  truncateWidth: PropTypes.number,
};

SeriesTitle.defaultProps = {
  subtitle: undefined,
  truncate: true,
  truncateLines: 2,
  truncateWidth: null,
};
