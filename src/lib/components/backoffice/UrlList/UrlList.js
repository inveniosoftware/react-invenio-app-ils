import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Icon, List } from 'semantic-ui-react';

export class UrlList extends Component {
  render() {
    const { urls } = this.props;
    if (_isEmpty(urls)) {
      return null;
    }
    return (
      <List bulleted>
        {urls.map((entry, idx) => (
          <List.Item key={idx}>
            <List.Content>
              <a href={entry.value}>
                {entry.description || entry.value}{' '}
                {entry.login_required && <Icon name="lock" />}
              </a>
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
