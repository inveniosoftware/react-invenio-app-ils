import _truncate from 'lodash/truncate';
import PropTypes from 'prop-types';
import React from 'react';
import { Icon, List } from 'semantic-ui-react';

const AccessUrl = ({ truncate, url }) => {
  const description = url.description || url.value;
  return (
    <a href={url.value}>
      {truncate ? _truncate(description, { length: 35 }) : description}{' '}
      <Icon name={url.open_access ? 'lock open' : 'lock'} />
    </a>
  );
};

AccessUrl.propTypes = {
  url: PropTypes.shape({
    description: PropTypes.string,
    value: PropTypes.string.isRequired,
    open_access: PropTypes.bool,
  }).isRequired,
  truncate: PropTypes.bool,
};

AccessUrl.defaultProps = {
  truncate: false,
};

export class SeriesAccessUrls extends React.Component {
  render() {
    const { urls, truncate } = this.props;
    return urls ? (
      <p>There are no access URLs.</p>
    ) : (
      <List bulleted>
        {urls.map((url, index) => (
          <List.Item key={url}>
            <AccessUrl truncate={truncate} url={url} />
          </List.Item>
        ))}
      </List>
    );
  }
}

SeriesAccessUrls.propTypes = {
  urls: PropTypes.object,
  truncate: PropTypes.bool,
};

SeriesAccessUrls.defaultProps = {
  urls: [],
  truncate: false,
};
