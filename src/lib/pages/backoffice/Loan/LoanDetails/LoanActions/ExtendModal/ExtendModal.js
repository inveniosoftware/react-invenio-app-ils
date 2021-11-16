import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import { ConfirmModal } from '@components/ConfirmModal';
import { withCancel } from '@api/utils';
import { documentApi } from '@api/documents';
import { Loader } from '@components/Loader';

export default class ExtendModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overbooked: false,
      isLoading: true,
    };
  }

  componentDidMount() {
    this.fetchCirculation();
  }

  componentWillUnmount() {
    this.cancellableCirculation && this.cancellableCirculation.cancel();
  }

  fetchCirculation = async () => {
    const { loanDetails, sendErrorNotification } = this.props;
    const { document_pid } = loanDetails.metadata;
    try {
      this.cancellableCirculation = withCancel(documentApi.get(document_pid));
      const response = await this.cancellableCirculation.promise;
      const circulation = response.data.metadata.circulation;
      this.setState({
        overbooked: circulation.overbooked === true,
        isLoading: false,
      });
    } catch (error) {
      if (error !== 'UNMOUNTED') {
        sendErrorNotification(
          'Something went wrong while checking if the literature is overbooked.',
          'If the problem persists, please contact technical support.'
        );
      }
    }
  };

  render() {
    const { overbooked, isLoading } = this.state;
    const { pid, loanAction, parentIsLoading } = this.props;
    return (
      <>
        <Loader isLoading={isLoading}>
          {overbooked ? (
            <ConfirmModal
              header={`Extend Loan #${pid}`}
              content={`Are you sure you want to extend the loan #${pid}?
            This literature is overbooked.`}
              buttonLabel="Extend"
              action={loanAction}
              isLoading={parentIsLoading}
              actionLabel="Extend"
            />
          ) : (
            <Button
              size="small"
              fluid
              primary
              onClick={loanAction}
              loading={parentIsLoading}
              disabled={parentIsLoading}
            >
              Extend
            </Button>
          )}
        </Loader>
      </>
    );
  }
}

ExtendModal.propTypes = {
  pid: PropTypes.string.isRequired,
  parentIsLoading: PropTypes.bool.isRequired,
  loanAction: PropTypes.func.isRequired,
  loanDetails: PropTypes.object.isRequired,
  sendErrorNotification: PropTypes.func.isRequired,
};
