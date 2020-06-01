import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import { RelationEdition } from '@modules/Relations/backoffice/RelationEdition';
import { RelationSequence } from '@pages/backoffice/Series/SeriesDetails/SeriesRelations/RelationSequence';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Label, Tab } from 'semantic-ui-react';
import { RelationLanguages } from './RelationLanguages';
import { RelationOther } from './RelationOther';

export default class SeriesSiblings extends Component {
  render() {
    const { isLoading, error, seriesDetails, relations } = this.props;

    const languages = relations['language'] || [];
    const editions = relations['edition'] || [];
    const other = relations['other'] || [];
    const sequence = relations['sequence'] || [];

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
            <RelationEdition recordDetails={seriesDetails} />
          </Tab.Pane>
        ),
      },
      {
        menuItem: {
          key: 'sequences',
          content: (
            <>
              Sequences <Label>{sequence.length}</Label>{' '}
            </>
          ),
        },
        render: () => (
          <Tab.Pane className="bo-relations-tab">
            <RelationSequence recordDetails={seriesDetails} />
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
          <Tab id="series-siblings" panes={panes} />
        </Error>
      </Loader>
    );
  }
}

SeriesSiblings.propTypes = {
  relations: PropTypes.object.isRequired,
  seriesDetails: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.object,
};

SeriesSiblings.defaultProps = {
  isLoading: false,
  error: null,
};
