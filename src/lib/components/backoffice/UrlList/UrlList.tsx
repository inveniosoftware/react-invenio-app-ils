import { UrlEntry } from '@api/types';
import _isEmpty from 'lodash/isEmpty';
import React, { Component } from 'react';
import { Icon, List } from 'semantic-ui-react';

export type { UrlEntry };

interface UrlListProps {
  urls?: UrlEntry[] | null;
}

export class UrlList extends Component<UrlListProps> {
  static defaultProps = {
    urls: null,
  };

  render() {
    const { urls } = this.props;
    if (_isEmpty(urls)) {
      return null;
    }
    return (
      <List bulleted>
        {urls!.map((entry, idx) => (
          <List.Item key={idx}>
            <List.Content>
              <a
                href={
                  entry.login_required_url
                    ? entry.login_required_url
                    : entry.value
                }
              >
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
