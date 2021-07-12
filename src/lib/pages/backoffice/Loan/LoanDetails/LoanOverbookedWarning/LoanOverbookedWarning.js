import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withCancel } from '@api/utils';
import { documentApi } from '@api/documents';
import { Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import {
  BackOfficeRoutes,
} from '@routes/urls';

const OVERBOOKED_MSG = (documentPid) => <>This literature is <Link to={BackOfficeRoutes.documentDetailsFor(documentPid)}>overbooked</Link></>
const ERROR_MSG = "Cannot verify if this literature is overbooked. Please refresh the page."

export default class LoanOverbookedWarning extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      msg: ''
    };
  }

  componentDidMount() {
    this.fetchCirculation();
  }

  componentWillUnmount() {
    this.cancellableCirculation && this.cancellableCirculation.cancel();
  }

  fetchCirculation = async () => {
    const { documentPid } = this.props;
    try {
      this.cancellableCirculation = withCancel(
        documentApi.get(documentPid)
      );
      const response = await this.cancellableCirculation.promise;
      const circulation = response.data.metadata.circulation;
      if (circulation.overbooked){
        this.setState({ hasError: false, msg: OVERBOOKED_MSG(documentPid)});
      }
    } catch (error) {
      if (error !== 'UNMOUNTED') {
        this.setState({ hasError: true, overbooked: OVERBOOKED_STATES.ERROR });
      }
    }
  };


  render() {
    const { hasError, msg } = this.state;
    const color = hasError ? 'red' : 'yellow';
    return (
      <>
      {msg &&
        <Message color={color}>
          {msg}
        </Message>
      }
      </>
    );
  }
}

LoanOverbookedWarning.propTypes = {
  documentPid: PropTypes.string.isRequired,
};
