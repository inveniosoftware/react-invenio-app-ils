import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';

class LiteratureEdition extends Component {
  render() {
    const { edition, withLabel } = this.props;

    return withLabel ? (
      <>
        <label>edition</label> {edition}
      </>
    ) : (
      `ed. ${edition}`
    );
  }
}

LiteratureEdition.propTypes = {
  edition: PropTypes.string.isRequired,
  withLabel: PropTypes.bool,
};

LiteratureEdition.defaultProps = {
  withLabel: false,
};

export default Overridable.component('LiteratureEdition', LiteratureEdition);
