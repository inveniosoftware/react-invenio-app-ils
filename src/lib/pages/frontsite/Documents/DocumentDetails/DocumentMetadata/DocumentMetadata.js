import { Media } from '@components/Media';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';

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
            <Media greaterThanOrEqual="tablet">
              <DocumentMetadataTabs metadata={documentDetails.metadata} />
            </Media>
            <Media at="mobile">
              <DocumentMetadataAccordion metadata={documentDetails.metadata} />
            </Media>
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
