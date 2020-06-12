import {
  ILSHeaderPlaceholder,
  ILSParagraphPlaceholder,
} from '@components/ILSPlaceholder';
import { ShowMoreContent } from '@components/ShowMoreContent';
import DocumentAuthors from '@modules/Document/DocumentAuthors';
import LiteratureCover from '@modules/Literature/LiteratureCover';
import _get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Grid, Responsive } from 'semantic-ui-react';
import { DocumentCirculation } from '../DocumentCirculation';
import DocumentPanelMobile from './DocumentPanelMobile';
import { DocumentTitle } from './DocumentTitle';

class DocumentPanel extends Component {
  render() {
    const { documentDetails: doc, isLoading } = this.props;
    return (
      <Overridable
        id="DocumentPanel.layout"
        documentDetails={doc}
        isLoading={isLoading}
      >
        <>
          <Responsive minWidth={Responsive.onlyTablet.minWidth}>
            <div
              className="document-panel"
              data-test={doc.metadata ? doc.metadata.pid : 0}
            >
              <Grid columns={3}>
                <Grid.Row>
                  <Grid.Column>
                    <LiteratureCover
                      url={_get(doc, 'metadata.cover_metadata.urls.large')}
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <Overridable
                      id="DocumentPanel.DocumentTitle"
                      documentDetails={doc}
                      isLoading={isLoading}
                    >
                      <ILSHeaderPlaceholder isLoading={isLoading}>
                        <DocumentTitle metadata={doc.metadata} />
                      </ILSHeaderPlaceholder>
                    </Overridable>

                    <ILSParagraphPlaceholder
                      linesNumber={1}
                      isLoading={isLoading}
                    >
                      <DocumentAuthors
                        authors={doc.metadata.authors}
                        hasOtherAuthors={doc.metadata.other_authors}
                        prefix="by "
                        listItemAs="h4"
                        limit={10}
                      />
                    </ILSParagraphPlaceholder>
                    <ILSParagraphPlaceholder
                      linesNumber={20}
                      isLoading={isLoading}
                    >
                      <ShowMoreContent lines={20}>
                        {doc.metadata.abstract}
                      </ShowMoreContent>
                    </ILSParagraphPlaceholder>
                  </Grid.Column>
                  <Grid.Column>
                    <DocumentCirculation
                      documentDetails={doc}
                      isLoading={isLoading}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </div>
          </Responsive>
          <Responsive {...Responsive.onlyMobile}>
            <DocumentPanelMobile isLoading={isLoading} documentDetails={doc} />
          </Responsive>
        </>
      </Overridable>
    );
  }
}

DocumentPanel.propTypes = {
  /* Redux */
  documentDetails: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
};

DocumentPanel.defaultProps = {
  isLoading: false,
};

export default Overridable.component('DocumentPanel', DocumentPanel);
