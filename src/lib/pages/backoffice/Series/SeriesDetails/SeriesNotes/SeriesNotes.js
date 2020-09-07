import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { InfoMessage } from '@components/backoffice/InfoMessage';
import { Header } from 'semantic-ui-react';
import _isEmpty from 'lodash/isEmpty';

export class SeriesNotes extends Component {
  renderAbstract() {
    const { series } = this.props;

    return series.metadata.note || series.metadata.internal_notes ? (
      <>
        <Header as="h3">Public note</Header>
        <p>{series.metadata.note}</p>
        <Header as="h3">Internal note</Header>
        <p>{this.renderInternalNotes()}</p>
      </>
    ) : (
      <InfoMessage
        header="No stored notes."
        content="Edit document to add a note"
      />
    );
  }

  renderInternalNotes = () => {
    const { series } = this.props;

    if (!_isEmpty(series.metadata.internal_notes)) {
      return series.metadata.internal_notes.map((entry, index) => (
        <>
          User {entry.user} noted for field {entry.field}:<br />
          <p>{entry.value}</p>
          <br />
        </>
      ));
    }
  };

  render() {
    return this.renderAbstract();
  }
}

SeriesNotes.propTypes = {
  series: PropTypes.object.isRequired,
};
