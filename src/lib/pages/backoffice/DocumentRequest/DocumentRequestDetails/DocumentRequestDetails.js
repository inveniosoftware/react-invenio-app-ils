import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Container, Divider, Grid, Sticky } from 'semantic-ui-react';
import { DocumentRequestActions } from './DocumentRequestActions';
import { DocumentRequestHeader } from './DocumentRequestHeader';
import { DocumentRequestMetadata } from './DocumentRequestMetadata';
import { DocumentRequestSteps } from './DocumentRequestSteps';

export default class DocumentRequestDetails extends Component {
  constructor(props) {
    super(props);

    this.headerRef = React.createRef();
  }

  componentDidMount() {
    const { fetchDocumentRequestDetails, match } = this.props;
    fetchDocumentRequestDetails(match.params.documentRequestPid);
  }

  componentDidUpdate(prevProps) {
    const { fetchDocumentRequestDetails, match } = this.props;

    const documentRequestPid = match.params.documentRequestPid;
    const samePidFromRouter =
      prevProps.match.params.documentRequestPid === documentRequestPid;
    if (!samePidFromRouter) {
      fetchDocumentRequestDetails(documentRequestPid);
    }
  }

  componentWillUnmount() {
    const { clearDocumentRequestDetails } = this.props;
    clearDocumentRequestDetails();
  }

  render() {
    const { data, isLoading, error } = this.props;
    return (
      <div ref={this.headerRef}>
        <Container fluid>
          <Loader isLoading={isLoading}>
            <Error error={error}>
              {data.metadata ? (
                <>
                  <Sticky context={this.headerRef} className="solid-background">
                    <Container fluid className="spaced">
                      <DocumentRequestHeader
                        created={data.created}
                        docReq={data.metadata}
                      />
                      <Divider />
                    </Container>
                  </Sticky>
                  <Container fluid>
                    <Grid columns={2}>
                      <Grid.Column width={13}>
                        <DocumentRequestSteps docReq={data.metadata} />
                        <DocumentRequestMetadata docReq={data.metadata} />
                      </Grid.Column>
                      <Grid.Column width={3}>
                        <DocumentRequestActions docReq={data.metadata} />
                      </Grid.Column>
                    </Grid>
                  </Container>
                </>
              ) : null}
            </Error>
          </Loader>
        </Container>
      </div>
    );
  }
}

DocumentRequestDetails.propTypes = {
  fetchDocumentRequestDetails: PropTypes.func.isRequired,
  clearDocumentRequestDetails: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      documentRequestPid: PropTypes.string,
    }),
  }).isRequired,
};

DocumentRequestDetails.defaultProps = {
  isLoading: false,
  error: {},
};
