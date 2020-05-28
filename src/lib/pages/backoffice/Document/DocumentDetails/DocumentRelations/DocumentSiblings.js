import { Error, Loader } from '@components';
import { RelationEdition } from '@modules/Relations/backoffice/RelationEdition';
import { RelationOther } from './RelationOther';
import { RelationLanguages } from './RelationLanguages';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Label, Tab } from 'semantic-ui-react';

export default class DocumentSiblings extends Component {
  render() {
    const { isLoading, error, documentDetails, relations } = this.props;

    const languages = relations['language'] || [];
    const editions = relations['edition'] || [];
    const other = relations['other'] || [];

    const panes = [
      {
        menuItem: {
          key: 'languages',
          content: (
            <>
              Languages <Label>{languages.length}</Label>{' '}
            </>
          ),
        },
        render: () => (
          <Tab.Pane className="bo-relations-tab">
            <RelationLanguages />
          </Tab.Pane>
        ),
      },
      {
        menuItem: {
          key: 'editions',
          content: (
            <>
              Editions <Label>{editions.length}</Label>{' '}
            </>
          ),
        },
        render: () => (
          <Tab.Pane className="bo-relations-tab">
            <RelationEdition recordDetails={documentDetails} />
          </Tab.Pane>
        ),
      },
      {
        menuItem: {
          key: 'Other',
          content: (
            <>
              Other <Label>{other.length}</Label>{' '}
            </>
          ),
        },
        render: () => (
          <Tab.Pane className="bo-relations-tab">
            <RelationOther />
          </Tab.Pane>
        ),
      },
    ];

    return (
      <Loader isLoading={isLoading}>
        <Error error={error}>
          <Tab id="document-siblings" panes={panes} />
        </Error>
      </Loader>
    );
  }
}

DocumentSiblings.propTypes = {
  relations: PropTypes.object.isRequired,
  documentDetails: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.object,
};

DocumentSiblings.defaultProps = {
  isLoading: false,
  error: null,
};
