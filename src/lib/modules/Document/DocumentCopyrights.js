import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Divider, Header, List } from 'semantic-ui-react';

export class DocumentCopyrights extends Component {
  renderCopyrights() {
    const {
      metadata: { copyrights },
    } = this.props;
    return (
      <List bulleted>
        {copyrights.map((entry) => (
          <List.Item key={entry.statement}>
            <a href={entry.url}>{entry.statement}</a>{' '}
            {entry.material && `(${entry.material})`} held by {entry.holder}
          </List.Item>
        ))}
      </List>
    );
  }

  renderLicenses = () => {
    const {
      metadata: { licenses },
    } = this.props;
    return (
      <List bulleted>
        {licenses.map((entry) => (
          <List.Item key={entry.license.id}>
            <a
              href={entry.license.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {entry.license.title}
            </a>{' '}
            {entry.material && `(${entry.material})`}{' '}
            {entry.license.maintainer &&
              `maintained by ${entry.license.maintainer}`}
          </List.Item>
        ))}
      </List>
    );
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
              {this.renderCopyrights()}
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
      return 'No copyrights nor licenses.';
    }
  }
}

DocumentCopyrights.propTypes = {
  metadata: PropTypes.object.isRequired,
};
