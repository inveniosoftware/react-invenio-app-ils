import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import _truncate from 'lodash/truncate';

const Url = ({ truncate, url }) => {
  const description = url.description || url.value;
  return (
    <a href={url.value}>
      {truncate ? _truncate(description, { length: 35 }) : description}{' '}
    </a>
  );
};

Url.propTypes = {
  truncate: PropTypes.bool,
  url: PropTypes.shape({
    description: PropTypes.string,
    value: PropTypes.string.isRequired,
  }).isRequired,
};

Url.defaultProps = {
  truncate: false,
};

export class SeriesUrls extends React.Component {
  render() {
    const { metadata, truncate } = this.props;
    const urls = get(metadata, 'urls', []);
    return isEmpty(urls) ? (
      <p>There are no URLs.</p>
    ) : (
      <List bulleted>
        {urls.map((url, index) => (
          <List.Item key={index}>
            <Url truncate={truncate} url={url} />
          </List.Item>
        ))}
      </List>
    );
  }
}

SeriesUrls.propTypes = {
  metadata: PropTypes.object.isRequired,
  truncate: PropTypes.bool,
};
