import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { List } from 'semantic-ui-react';

export class UrlList extends Component {
  render() {
    const { urls } = this.props;
    if (_isEmpty(urls)) {
      return null;
    }
    return (
      <List bulleted>
        {urls.map(entry => (
          <List.Item key={entry.value}>
            <List.Content>
              <a href={entry.value}>{entry.description || entry.value}</a>
            </List.Content>
          </List.Item>
        ))}
      </List>
    );
  }
}

UrlList.propTypes = {
  urls: PropTypes.array,
};

UrlList.defaultProps = {
  urls: null,
};
