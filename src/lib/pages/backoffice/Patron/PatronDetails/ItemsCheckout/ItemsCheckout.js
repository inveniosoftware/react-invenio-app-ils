import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Message } from 'semantic-ui-react';

export default class ItemsCheckout extends Component {
  render() {
    const { isLoading, error } = this.props;

    return (
      <Loader isLoading={isLoading}>
        <Error error={error}>
          <Message color="blue">
            Scan or type the barcode to checkout the physical copy for this
            patron.
          </Message>
        </Error>
      </Loader>
    );
  }
}

ItemsCheckout.propTypes = {
  error: PropTypes.object,
  isLoading: PropTypes.bool,
};

ItemsCheckout.defaultProps = {
  error: null,
  isLoading: false,
};
