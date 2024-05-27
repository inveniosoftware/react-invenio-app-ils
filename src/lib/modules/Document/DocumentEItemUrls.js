import { RedirectToLoginButton } from '@authentication/components/RedirectToLoginButton';
import { sessionManager } from '@authentication/services/SessionManager';
import { ShowMoreItems } from '@components/ShowMoreItems';
import { invenioConfig } from '@config';
import { DownloadLink } from '@modules/EItem/DownloadLink';
import { LiteratureAccessUrls } from '@modules/Literature/LiteratureAccessUrls';
import prettyBytes from 'pretty-bytes';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';
import React, { Component } from 'react';
import { Divider, Header, List } from 'semantic-ui-react';

export class DocumentEItemUrls extends Component {
  renderTitle = (title) => {
    const { dividers } = this.props;
    return dividers ? (
      <Divider horizontal>{title}</Divider>
    ) : (
      <Header as="h5">{title}</Header>
    );
  };

  userCanSeeFiles = (eitem) => {
    return eitem.open_access || sessionManager.isAuthenticated();
  };

  renderFileLogin = () => (
    <RedirectToLoginButton content="Sign in to view all files" fluid positive />
  );

  renderReadableList = () => {
    const { eitems } = this.props;
    return eitems.hits.map((eitem) => {
      if (!_isEmpty(eitem.urls)) {
        return (
          <LiteratureAccessUrls
            key={eitem.pid}
            truncate
            urls={eitem.urls}
            openAccess={eitem.open_access}
          />
        );
      }
      return null;
    });
  };

  hasReadable = () => {
    const { eitems } = this.props;
    return eitems.hits.some((eitem) => eitem.urls.length > 0);
  };

  renderDownloadLink = (eitem, file) => (
    <List.Item key={file.file_id}>
      <List.Icon name="download" />
      <List.Content>
        <DownloadLink eitem={eitem} content={file.key} filename={file.key}>
          file
        </DownloadLink>{' '}
        ({prettyBytes(file.size)})
      </List.Content>
    </List.Item>
  );

  renderDownloadableList = () => {
    const { eitems, dividers } = this.props;
    const hasRestrictedFiles = eitems.hits.some(
      (eitem) => !this.userCanSeeFiles(eitem)
    );
    return (
      <>
        {this.renderTitle('Download')}
        <ShowMoreItems lines={invenioConfig.LITERATURE.frontsiteMaxLinks}>
          {eitems.hits
            .filter((eitem) => this.userCanSeeFiles(eitem))
            .flatMap((eitem) =>
              eitem.files.map((file) => this.renderDownloadLink(eitem, file))
            )}
        </ShowMoreItems>
        {hasRestrictedFiles && !dividers && this.renderFileLogin()}
      </>
    );
  };

  hasDownloadable = () => {
    const { eitems } = this.props;
    return eitems.hits.some((eitem) => eitem.files.length > 0);
  };

  render() {
    const hasReadable = this.hasReadable();
    const hasDownloadable = this.hasDownloadable();
    const hasReadableOrDownloadable = hasReadable || hasDownloadable;
    return (
      <>
        {hasReadable && this.renderReadableList()}
        {hasDownloadable && this.renderDownloadableList()}
        {!hasReadableOrDownloadable && 'No e-resources'}
      </>
    );
  }
}

DocumentEItemUrls.propTypes = {
  eitems: PropTypes.object.isRequired,
  dividers: PropTypes.bool,
};

DocumentEItemUrls.defaultProps = {
  dividers: false,
};
