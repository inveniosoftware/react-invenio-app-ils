import { MetadataTable } from '@components/backoffice/MetadataTable';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Divider, Header } from 'semantic-ui-react';
import { List } from 'semantic-ui-react';
import { InfoMessage } from '@components/backoffice/InfoMessage';

export class DocumentCopyrights extends Component {
  renderCopyrights() {
    const {
      document: {
        metadata: { copyrights },
      },
    } = this.props;
    const rows = [];
    if (copyrights) {
      copyrights.forEach(element => {
        rows.push({ name: element.holder, value: element.year });
      });
    }
    return rows;
  }

  renderLicenses = () => {
    const {
      document: {
        metadata: { licenses },
      },
    } = this.props;
    return (
      <List bulleted>
        {licenses.map((entry, index) => (
          <List.Item key={index}>{entry}</List.Item>
        ))}
      </List>
    );
  };

  render() {
    const {
      document: {
        metadata: { licenses, copyrights },
      },
    } = this.props;
    if (copyrights || licenses) {
      return (
        <>
          {copyrights && (
            <>
              <Header as="h3">Copyrights</Header>
              <MetadataTable rows={this.renderCopyrights()} />
            </>
          )}
          {copyrights && licenses && <Divider />}

          {licenses && (
            <>
              <Header as="h3">Licenses</Header>
              {this.renderLicenses()}
            </>
          )}
        </>
      );
    } else {
      return (
        <InfoMessage
          header="No stored copyrights nor licenses."
          content="Edit document to add copyrights or licenses"
        />
      );
    }
  }
}

DocumentCopyrights.propTypes = {
  document: PropTypes.object.isRequired,
};
