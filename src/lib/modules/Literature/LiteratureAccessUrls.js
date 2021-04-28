import { ShowMoreItems } from '@components/ShowMoreItems';
import { invenioConfig } from '@config';
import _isEmpty from 'lodash/isEmpty';
import _truncate from 'lodash/truncate';
import PropTypes from 'prop-types';
import React from 'react';
import { List } from 'semantic-ui-react';

const AccessUrl = ({ truncate, url, openAccess }) => {
  const description = url.description || url.value;
  return (
    <List.Item>
      <List.Icon name="linkify" />
      <List.Content>
        <a href={url.login_required_url ? url.login_required_url : url.value}>
          {truncate ? _truncate(description, { length: 35 }) : description}{' '}
        </a>
        {url.login_required && '(login required)'}
        {(url.open_access || openAccess) && '(open access)'}
      </List.Content>
    </List.Item>
  );
};

AccessUrl.propTypes = {
  url: PropTypes.shape({
    description: PropTypes.string,
    value: PropTypes.string.isRequired,
    login_required: PropTypes.bool,
    login_required_url: PropTypes.string,
    open_access: PropTypes.bool,
  }).isRequired,
  truncate: PropTypes.bool,
  openAccess: PropTypes.bool,
};

AccessUrl.defaultProps = {
  truncate: false,
  openAccess: false,
};

export class LiteratureAccessUrls extends React.Component {
  render() {
    const { urls, truncate, openAccess } = this.props;
    return _isEmpty(urls) ? (
      <p>There are no e-resources.</p>
    ) : (
      <ShowMoreItems lines={invenioConfig.LITERATURE.frontsiteMaxLinks}>
        {urls.map((url, index) => (
          <AccessUrl
            key={index}
            truncate={truncate}
            url={url}
            openAccess={openAccess}
          />
        ))}
      </ShowMoreItems>
    );
  }
}

LiteratureAccessUrls.propTypes = {
  urls: PropTypes.arrayOf(AccessUrl.propTypes.url),
  truncate: PropTypes.bool,
  openAccess: PropTypes.bool,
};

LiteratureAccessUrls.defaultProps = {
  urls: [],
  truncate: false,
  openAccess: false,
};
