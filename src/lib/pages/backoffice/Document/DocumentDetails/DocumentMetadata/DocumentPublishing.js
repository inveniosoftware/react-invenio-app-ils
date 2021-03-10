import { InfoMessage } from '@components/backoffice/InfoMessage';
import { MetadataTable } from '@components/backoffice/MetadataTable';
import capitalize from 'lodash/capitalize';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Divider, Header, List } from 'semantic-ui-react';

export class DocumentPublishing extends Component {
  prepareImprintInfo = () => {
    const { document } = this.props;

    return [
      { name: 'Publisher', value: document.metadata.imprint.publisher },
      { name: 'Date', value: document.metadata.imprint.date },
      { name: 'Place', value: document.metadata.imprint.place },
      { name: 'Reprint', value: document.metadata.imprint.reprint },
    ];
  };

  preparePublicationInfo = (element) => {
    return [
      { name: 'Article ID', value: element.artid },
      { name: 'Journal title', value: element.journal_title },
      { name: 'Journal volume', value: element.journal_volume },
      { name: 'Journal issue', value: element.journal_issue },
      { name: 'Pages', value: element.pages },
      { name: 'Year', value: element.year },
      { name: 'Note', value: element.note },
    ];
  };

  renderConferenceInfo = () => {
    const {
      document: {
        metadata: { conference_info },
      },
    } = this.props;
    let rows = [];
    conference_info.map((conf) => {
      for (const [key, val] of Object.entries(conf)) {
        if (Array.isArray(val)) {
          const arrayVals = (
            <List>
              {val.map((entry) => (
                <List.Item key={entry.value}>
                  <List.Content>
                    <List.Header>{entry.scheme}</List.Header>
                    <List.Description>{entry.value}</List.Description>
                  </List.Content>
                </List.Item>
              ))}
            </List>
          );
          rows.push({ name: capitalize(key), value: arrayVals });
        } else {
          rows.push({ name: capitalize(key), value: val });
        }
      }
      if (conference_info.length > 1) {
        rows.push(<br />);
        rows.push(<br />);
      }
    });
    return rows;
  };

  render() {
    const { document } = this.props;

    if (
      !_isEmpty(document.metadata.imprint) ||
      !_isEmpty(document.metadata.conference_info) ||
      !_isEmpty(document.metadata.publication_info)
    ) {
      return (
        <>
          {document.metadata.imprint && (
            <>
              <Header as="h3">Imprint</Header>
              <MetadataTable rows={this.prepareImprintInfo()} />
            </>
          )}

          {document.metadata.imprint && document.metadata.publication_info && (
            <Divider />
          )}

          {document.metadata.publication_info && (
            <>
              <Header as="h3">Publication info</Header>
              {document.metadata.publication_info.map((element) => (
                // eslint-disable-next-line react/jsx-key
                <MetadataTable rows={this.preparePublicationInfo(element)} />
              ))}
            </>
          )}

          {(document.metadata.imprint || document.metadata.publication_info) &&
            document.metadata.conference_info && <Divider />}

          {document.metadata.conference_info && (
            <>
              <Header>Conference info</Header>
              <MetadataTable rows={this.renderConferenceInfo()} />
            </>
          )}
        </>
      );
    }
    return (
      <InfoMessage
        header="No publishing information."
        content="Edit document to add publishing information"
      />
    );
  }
}

DocumentPublishing.propTypes = {
  document: PropTypes.object.isRequired,
};
