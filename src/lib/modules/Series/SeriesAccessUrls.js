import React from 'react';
import PropTypes from 'prop-types';
import { Icon, List } from 'semantic-ui-react';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import _truncate from 'lodash/truncate';

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
    const { metadata, truncate } = this.props;
    const urls = get(metadata, 'access_urls', []);
    return isEmpty(urls) ? (
      <p>There are no access URLs.</p>
    ) : (
      <List bulleted>
        {urls.map((url, index) => (
          <List.Item key={index}>
            <AccessUrl truncate={truncate} url={url} />
          </List.Item>
        ))}
      </List>
    );
  }
}

SeriesAccessUrls.propTypes = {
  metadata: PropTypes.object.isRequired,
  truncate: PropTypes.bool,
};

SeriesAccessUrls.defaultProps = {
  truncate: false,
};
