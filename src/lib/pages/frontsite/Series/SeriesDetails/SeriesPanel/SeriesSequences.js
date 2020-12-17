import { FrontSiteRoutes } from '@routes/urls';
import _get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Link } from 'react-router-dom';
import { Header, List, Segment } from 'semantic-ui-react';

class SeriesSequences extends Component {
  renderSequenceLinks = (sequences) => {
    return (
      <>
        <List>
          {sequences.map((sequence) => (
            <List.Item key={sequence.pid_value}>
              <List.Content>
                <Link to={FrontSiteRoutes.seriesDetailsFor(sequence.pid_value)}>
                  {sequence.record_metadata.title}
                </Link>
              </List.Content>
            </List.Item>
          ))}
        </List>{' '}
      </>
    );
  };

  render() {
    const { relations } = this.props;
    const sequenceRelations = _get(relations, 'sequence', []);
    const hasSequenceRelations = sequenceRelations.length > 0;
    if (!hasSequenceRelations) return null;

    const predecessors = sequenceRelations.filter(
      (rel) => rel.relation_order === 'continues'
    );
    const hasPredecessors = predecessors.length > 0;

    const continuations = sequenceRelations.filter(
      (rel) => rel.relation_order === 'is_continued_by'
    );
    const hasContinuations = continuations.length > 0;

    return (
      <Segment>
        <Header size="small">Read more</Header>
        {hasPredecessors && (
          <>
            This series continues the following:
            {this.renderSequenceLinks(predecessors)}
          </>
        )}
        {hasContinuations && (
          <>
            This series is continued by:
            {this.renderSequenceLinks(continuations)}
          </>
        )}
      </Segment>
    );
  }
}

SeriesSequences.propTypes = {
  relations: PropTypes.object.isRequired,
};

export default Overridable.component('SeriesSequences', SeriesSequences);
