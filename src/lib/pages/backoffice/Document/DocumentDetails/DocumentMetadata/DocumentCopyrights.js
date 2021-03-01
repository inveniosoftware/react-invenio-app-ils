import { InfoMessage } from '@components/backoffice/InfoMessage';
import { MetadataTable } from '@components/backoffice/MetadataTable';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Divider, Header, Table } from 'semantic-ui-react';

export class DocumentCopyrights extends Component {
  renderCopyrights() {
    const {
      metadata: { copyrights },
    } = this.props;
    const rows = [];
    if (copyrights) {
      copyrights.forEach((element) => {
        rows.push({ name: 'Holder', value: element.holder });
        rows.push({ name: 'Statement', value: element.statement });
        rows.push({ name: 'Url', value: element.url });
        rows.push({ name: 'Material', value: element.material });
      });
    }
    return rows;
  }

  renderLicenses = () => {
    const {
      metadata: { licenses },
    } = this.props;
    return licenses.map((entry) => (
      <Table key={entry.license.id} definition>
        <Table.Body>
          <Table.Row>
            <Table.Cell>License</Table.Cell>
            <Table.Cell>{entry.license.title}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Maintainer</Table.Cell>
            <Table.Cell>{entry.license.maintainer}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Status</Table.Cell>
            <Table.Cell>{entry.license.status}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Url</Table.Cell>
            <Table.Cell>{entry.license.url}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Material</Table.Cell>
            <Table.Cell>{entry.material}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Internal notes</Table.Cell>
            <Table.Cell>{entry.internal_notes}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    ));
  };

  render() {
    const {
      metadata: { licenses, copyrights },
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
          header="No copyrights nor licenses."
          content="Edit document to add copyrights or licenses"
        />
      );
    }
  }
}

DocumentCopyrights.propTypes = {
  metadata: PropTypes.object.isRequired,
};
