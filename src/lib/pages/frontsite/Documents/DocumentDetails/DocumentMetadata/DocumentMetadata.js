import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Container, Responsive } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { DocumentStats } from '@modules/Document/DocumentStats';

import { DocumentMetadataTabs } from './DocumentMetadataTabs';
import { default as DocumentMetadataAccordion } from './DocumentMetadataAccordion';

class DocumentMetadata extends Component {
  render() {
    const { documentDetails } = this.props;
    return (
      <Container
        className="document-metadata"
        data-test={documentDetails.metadata.pid}
      >
        <Overridable id="DocumentMetadata.layout" documentDetails={document}>
          <>
            <Responsive minWidth={Responsive.onlyTablet.minWidth}>
              <DocumentMetadataTabs metadata={documentDetails.metadata} />
            </Responsive>
            <Responsive {...Responsive.onlyMobile}>
              <DocumentMetadataAccordion metadata={documentDetails.metadata} />
            </Responsive>
            <Container textAlign="center">
              <DocumentStats document={documentDetails} />
            </Container>
          </>
        </Overridable>
      </Container>
    );
  }
}

DocumentMetadata.propTypes = {
  documentDetails: PropTypes.object.isRequired,
};

export default Overridable.component('DocumentMetadata', DocumentMetadata);
