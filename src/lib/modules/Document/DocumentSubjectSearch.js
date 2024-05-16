import { documentApi } from '@api/documents';
import { Media } from '@components/Media';
import {
  setReactSearchKitDefaultSortingOnEmptyQueryString,
  setReactSearchKitInitialQueryState,
  setReactSearchKitUrlHandler,
} from '@config';
import history from '@history';
import { SearchControls } from '@modules/SearchControls/SearchControls';
import { SearchControlsOverridesMap } from '@modules/SearchControls/SearchControlsOverrides';
import SearchFooter from '@modules/SearchControls/SearchFooter';
import PropTypes from 'prop-types';
import React from 'react';
import _get from 'lodash/get';
import { OverridableContext } from 'react-overridable';
import {
  EmptyResults,
  Error,
  InvenioSearchApi,
  ReactSearchKit,
  ResultsLoader,
  ResultsGrid,
} from 'react-searchkit';
import { Header, Container, Ref, Sticky } from 'semantic-ui-react';
import { InvenioRequestSerializer } from 'react-searchkit';
import { DocumentSubjectGrid } from './DocumentSubjectLayout';
import { Error as IlsError } from '@components/Error';
import { SearchControlsMobile } from '@modules/SearchControls/SearchControlsMobile';
import { ILSParagraphPlaceholder } from '@components/ILSPlaceholder';

export const DocumentSubjects = ({ metadata, isLoading }) => {
  const renderDocumentSubjectSearch = _get(metadata, 'subjects', null) !== null;
  return (
    renderDocumentSubjectSearch && (
      <>
        <Media greaterThanOrEqual="computer">
          <Container className="items-locations spaced">
            <ILSParagraphPlaceholder linesNumber={1} isLoading={isLoading}>
              <DocumentSubjectSearch metadata={metadata} />
            </ILSParagraphPlaceholder>
          </Container>
        </Media>
        <Media lessThan="computer">
          <ILSParagraphPlaceholder linesNumber={5} isLoading={isLoading}>
            <DocumentSubjectSearch metadata={metadata} />
          </ILSParagraphPlaceholder>
        </Media>
      </>
    )
  );
};

DocumentSubjects.propTypes = {
  metadata: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const queryBuilderForSubjects = (documentMetadata) => {
  let subjectsQuery = documentApi
    .query()
    .withSubjects(documentMetadata.subjects)
    .qs();

  return class DocumentSubjectsSerializer extends InvenioRequestSerializer {
    serialize(stateQuery) {
      stateQuery.queryString = subjectsQuery;
      stateQuery.size = 5;
      return super.serialize(stateQuery);
    }
  };
};

class DocumentSubjectSearch extends React.Component {
  modelName = 'DOCUMENTS';

  render() {
    const { metadata } = this.props;
    const api = new InvenioSearchApi({
      axios: {
        url: documentApi.searchBaseURL,
        withCredentials: true,
      },
      invenio: {
        requestSerializer: queryBuilderForSubjects(metadata),
      },
    });

    const initialState = setReactSearchKitInitialQueryState(this.modelName);
    const defaultSortingOnEmptyQueryString =
      setReactSearchKitDefaultSortingOnEmptyQueryString(this.modelName);
    const urlHandler = setReactSearchKitUrlHandler(this.modelName, false);
    return (
      <>
        <Header as="h2" textAlign="center">
          More on this subject
        </Header>
        <OverridableContext.Provider
          value={{
            ...SearchControlsOverridesMap,
            ResultsGrid: DocumentSubjectGrid,
          }}
        >
          <ReactSearchKit
            searchApi={api}
            history={history}
            urlHandlerApi={urlHandler}
            initialQueryState={initialState}
            defaultSortingOnEmptyQueryString={defaultSortingOnEmptyQueryString}
          >
            <>
              <Media greaterThanOrEqual="computer">
                <ResultsLoader>
                  <EmptyResults />
                  <Error />
                  <SearchControls
                    modelName={this.modelName}
                    withLayoutSwitcher={false}
                  />
                  <ResultsGrid />
                  <SearchFooter />
                </ResultsLoader>
              </Media>
              <Media lessThan="computer">
                <DocumentSubjectSearchMobile metadata={metadata} />
              </Media>
            </>
          </ReactSearchKit>
        </OverridableContext.Provider>
      </>
    );
  }
}

DocumentSubjectSearch.propTypes = {
  metadata: PropTypes.object.isRequired,
};

class DocumentSubjectSearchMobile extends React.Component {
  stickyRef = React.createRef();

  renderError = (error) => {
    return <IlsError error={error} />;
  };

  render() {
    return (
      <Container fluid className="grid-documents-search">
        <ResultsLoader>
          <EmptyResults />
          <Error renderElement={this.renderError} />
          <Ref innerRef={this.stickyRef}>
            <Container fluid>
              <Sticky context={this.stickyRef} offset={66}>
                <SearchControlsMobile
                  ref={this.stickyRef}
                  modelName="DOCUMENTS"
                />
              </Sticky>
              <Container className="fs-search-body" textAlign="center">
                <ResultsGrid overridableId="documents_subjects_mobile" />
              </Container>
            </Container>
          </Ref>
        </ResultsLoader>
      </Container>
    );
  }
}

DocumentSubjectSearchMobile.propTypes = {};
