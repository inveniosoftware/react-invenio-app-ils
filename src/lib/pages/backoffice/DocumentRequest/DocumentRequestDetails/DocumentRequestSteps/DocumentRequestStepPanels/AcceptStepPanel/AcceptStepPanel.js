import {
  AcquisitionOrderIcon,
  ILLBorrowingRequestIcon,
} from '@components/backoffice/icons';
import { invenioConfig } from '@config';
import LiteratureTitle from '@modules/Literature/LiteratureTitle';
import { AcquisitionRoutes, BackOfficeRoutes, ILLRoutes } from '@routes/urls';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, Label, Segment } from 'semantic-ui-react';

export default class AcceptStepPanel extends Component {
  handleAcceptRequest = () => {
    const { acceptRequest, docReq } = this.props;
    acceptRequest(docReq.pid);
  };

  render() {
    const { docReq } = this.props;
    const documentLink = (
      <Link to={BackOfficeRoutes.documentDetailsFor(docReq.document_pid)}>
        <LiteratureTitle
          title={docReq.document.title}
          edition={docReq.document.edition}
          publicationYear={docReq.document.publication_year}
        />
      </Link>
    );

    const provider = docReq.physical_item_provider;
    let providerLink;
    const { physicalItemProviders } = invenioConfig.DOCUMENT_REQUESTS;
    if (provider.pid_type === physicalItemProviders.acq.pid_type) {
      providerLink = (
        <>
          <AcquisitionOrderIcon /> Acquisition order:{' '}
          <Link to={AcquisitionRoutes.orderDetailsFor(provider.pid)}>
            {provider.pid}
          </Link>
        </>
      );
    } else if (provider.pid_type === physicalItemProviders.ill.pid_type) {
      providerLink = (
        <>
          <ILLBorrowingRequestIcon /> Interlibrary loan:{' '}
          <Link to={ILLRoutes.borrowingRequestDetailsFor(provider.pid)}>
            {provider.pid}
          </Link>
        </>
      );
    }

    return (
      <Segment>
        <Grid columns={2} textAlign="center" verticalAlign="middle">
          <Grid.Column width={10}>
            <Segment padded>
              <Label attached="top">Selected document</Label>
              <div>{documentLink}</div>
            </Segment>
            <Segment padded>
              <Label attached="top">Selected provider</Label>
              <div>{providerLink}</div>
            </Segment>
          </Grid.Column>
          <Grid.Column width={6}>
            <Button
              size="large"
              color="green"
              icon="check"
              labelPosition="left"
              onClick={this.handleAcceptRequest}
              content="Accept request"
            />
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}

AcceptStepPanel.propTypes = {
  acceptRequest: PropTypes.func.isRequired,
  docReq: PropTypes.object.isRequired,
};
