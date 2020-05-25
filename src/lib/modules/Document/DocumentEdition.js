import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import Overridable from 'react-overridable';

const DocumentEdition = ({ metadata, withLabel }) => {
  const edition = _get(metadata, 'edition');
  if (!edition) {
    return null;
  }

  return withLabel ? (
    <>
      <label>edition</label> {metadata.edition}
    </>
  ) : (
    `ed. ${edition}`
  );
};

DocumentEdition.propTypes = {
  metadata: PropTypes.object.isRequired,
  withLabel: PropTypes.bool,
};

DocumentEdition.defaultProps = {
  withLabel: false,
};

export default Overridable.component('DocumentEdition', DocumentEdition);
