import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import { DocumentTitle } from '@modules/Document/DocumentTitle';
import { SeriesDetailsLink } from '@components/backoffice/buttons';
import { InfoMessage } from '@components/backoffice/InfoMessage';
import { ExistingRelations } from '@modules/Relations/backoffice/components/ExistingRelations';
import { RelationRemover } from '@modules/Relations/backoffice/components/RelationRemover';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Divider, Grid } from 'semantic-ui-react';
import { RelationSequenceModal } from '../RelationSequence';

export default class RelationSequence extends Component {
  constructor(props) {
    super(props);
    this.relationType = 'sequence';
  }

  viewDetails = ({ row }) => {
    return (
      <SeriesDetailsLink pidValue={row.pid_value}>
        <DocumentTitle metadata={row.record_metadata} />
      </SeriesDetailsLink>
    );
  };

  removeHandler = ({ row }) => {
    const { seriesDetails } = this.props;

    if (!_isEmpty(seriesDetails)) {
      return (
        <RelationRemover
          referrer={seriesDetails}
          related={row}
          relationType={row.relation_type}
          buttonContent="Remove relation"
        />
      );
    }
  };

  render() {
    const { relations, showMaxRows, isLoading, error } = this.props;

    const sequenceRelations = _get(relations, 'sequence', []);
    const continuations = sequenceRelations.filter(
      rel => rel.relation_order === 'is_continued_by'
    );
    const predecessors = sequenceRelations.filter(
      rel => rel.relation_order === 'continues'
    );

    const columns = [
      { title: 'PID', field: 'pid_value' },
      { title: 'Title', field: '', formatter: this.viewDetails },
      { title: 'Actions', field: '', formatter: this.removeHandler },
    ];

    return (
      <Loader isLoading={isLoading}>
        <Error error={error}>
          <RelationSequenceModal relationType={this.relationType} />
          <Grid columns={2} relaxed="very">
            <Grid.Column width={8}>
              <Divider horizontal>Predecessors of this serial </Divider>
              <ExistingRelations
                rows={predecessors}
                showMaxRows={showMaxRows}
                columns={columns}
                emptyMessage={
                  <InfoMessage
                    header="No predecessors"
                    content="Use the button above to add sequence relations."
                  />
                }
              />
            </Grid.Column>
            <Grid.Column width={8}>
              <Divider horizontal>Continuations of this serial </Divider>
              <ExistingRelations
                rows={continuations}
                showMaxRows={showMaxRows}
                columns={columns}
                emptyMessage={
                  <InfoMessage
                    header="No continuations"
                    content="Use the button above to add sequence relations."
                  />
                }
              />
            </Grid.Column>
          </Grid>
        </Error>
      </Loader>
    );
  }
}

RelationSequence.propTypes = {
  relations: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  seriesDetails: PropTypes.object.isRequired,
  showMaxRows: PropTypes.number,
  error: PropTypes.object,
};

RelationSequence.defaultProps = {
  showMaxRows: 3,
  error: null,
};
