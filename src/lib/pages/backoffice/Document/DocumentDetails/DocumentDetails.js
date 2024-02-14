import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Container, Divider, Grid, Ref, Sticky } from 'semantic-ui-react';
import { DocumentActionMenu } from './DocumentActionMenu';
import { DocumentMetadata } from './DocumentMetadata';
import { DocumentSummary } from './DocumentSummary';
import { DocumentContent } from './DocumentContent';
import { DocumentHeader } from './DocumentHeader';

export default class DocumentDetails extends Component {
  constructor(props) {
    super(props);
    this.menuRef = React.createRef();
    this.headerRef = React.createRef();

    this.anchors = {
      summaryRef: React.createRef(),
      loanRequestsRef: React.createRef(),
      attachedItemsRef: React.createRef(),
      attachedEItemsRef: React.createRef(),
      seriesRef: React.createRef(),
      relatedRef: React.createRef(),
      borrowingRequestsRef: React.createRef(),
      purchaseOrdersRef: React.createRef(),
      statisticsRef: React.createRef(),
    };
  }

  componentDidMount() {
    const { fetchDocumentDetails, match } = this.props;
    fetchDocumentDetails(match.params.documentPid);
  }

  componentDidUpdate(prevProps) {
    const { fetchDocumentDetails, match } = this.props;

    const documentPid = match.params.documentPid;
    const samePidFromRouter =
      prevProps.match.params.documentPid === documentPid;
    if (!samePidFromRouter) {
      fetchDocumentDetails(documentPid);
    }
  }

  render() {
    const { isLoading, error, data } = this.props;
    return (
      <div ref={this.headerRef}>
        <Container fluid>
          <Loader isLoading={isLoading}>
            <Error error={error}>
              <Sticky context={this.headerRef} className="solid-background">
                <Container fluid className="spaced">
                  <DocumentHeader data={data} />
                </Container>
                <Divider />
              </Sticky>
              <Container fluid>
                <Ref innerRef={this.menuRef}>
                  <Grid columns={2}>
                    <Grid.Column width={13}>
                      <Container className="spaced">
                        <Container className="spaced">
                          <div
                            ref={this.anchors.summaryRef}
                            id="document-summary"
                          >
                            <DocumentSummary
                              anchors={this.anchors}
                              document={data}
                            />
                          </div>
                        </Container>
                        <DocumentMetadata anchors={this.anchors} />
                        <DocumentContent anchors={this.anchors} data={data} />
                      </Container>
                    </Grid.Column>
                    <Grid.Column width={3}>
                      <Sticky context={this.menuRef} offset={200}>
                        <DocumentActionMenu offset={-250} />
                      </Sticky>
                    </Grid.Column>
                  </Grid>
                </Ref>
              </Container>
            </Error>
          </Loader>
        </Container>
      </div>
    );
  }
}

DocumentDetails.propTypes = {
  // Redux
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  data: PropTypes.object.isRequired,
  fetchDocumentDetails: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      documentPid: PropTypes.string,
    }),
  }).isRequired,
};

DocumentDetails.defaultProps = {
  error: null,
};
