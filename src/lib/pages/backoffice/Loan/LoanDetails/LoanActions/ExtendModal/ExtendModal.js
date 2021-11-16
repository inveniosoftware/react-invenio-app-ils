import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Header, Icon, Grid } from 'semantic-ui-react';
import { withCancel } from '@api/utils';
import { documentApi } from '@api/documents';

export default class ExtendModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overbooked: false,
      open: false,
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

  extend = () => {
    const { loanAction } = this.props;
    loanAction();
    this.hide();
  };

  hide = () => this.setState({ open: false });
  show = () => this.setState({ open: true });

  render() {
    const { pid, isLoading } = this.props;
    const { open, overbooked } = this.state;
    return (
      <>
        {overbooked ? (
          <Modal
            size="small"
            trigger={
              <Button
                primary
                fluid
                content="Extend"
                onClick={this.show}
                loading={isLoading}
                disabled={isLoading}
              />
            }
            open={open}
            onClose={this.hide}
          >
            <Header content={`Extend Loan #${pid}`} />
            <Modal.Content>
              <Grid>
                <Grid.Column width={1}>
                  <Icon name="warning sign" color="red" size="large" />
                </Grid.Column>
                <Grid.Column width={15}>
                  <p>
                    {`Are you sure you want to extend the loan #${pid}?
            This literature is overbooked.`}
                  </p>
                </Grid.Column>
              </Grid>
            </Modal.Content>
            <Modal.Actions>
              <Button secondary onClick={this.hide}>
                Cancel
              </Button>
              <Button primary onClick={this.extend}>
                Extend
              </Button>
            </Modal.Actions>
          </Modal>
        ) : (
          <Button
            size="small"
            fluid
            primary
            onClick={this.extend}
            loading={isLoading}
            disabled={isLoading}
          >
            Extend
          </Button>
        )}
      </>
    );
  }
}

ExtendModal.propTypes = {
  pid: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  loanAction: PropTypes.func.isRequired,
  loanDetails: PropTypes.object.isRequired,
  sendErrorNotification: PropTypes.func.isRequired,
};
