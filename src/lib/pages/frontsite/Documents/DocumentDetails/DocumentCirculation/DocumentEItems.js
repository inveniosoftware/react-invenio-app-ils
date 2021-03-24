import { FrontSiteRoutes } from '@routes/urls';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Divider, Header } from 'semantic-ui-react';
import { DocumentEItemUrls } from '@modules/Document/DocumentEItemUrls';

export class DocumentEItems extends Component {
  showAll = () => {
    const { showTab } = this.props;
    showTab(5);
    const element = document.getElementById('document-metadata-section');
    element.scrollIntoView({ behavior: 'smooth' });
  };

  onClickEItemRequestLink = () => {
    const medium = 'E-BOOK';
    return {
      pathname: FrontSiteRoutes.documentRequestForm,
      state: { medium },
    };
  };

  render() {
    const { eitems } = this.props;

    return (
      <>
        <Header as="h3">Access online</Header>
        {eitems.total > 0 ? (
          <DocumentEItemUrls eitems={eitems} />
        ) : (
          <>
            No e-resources currently available. <br />
            <Link to={this.onClickEItemRequestLink()}>Request the e-book.</Link>
          </>
        )}
        <Divider horizontal>Or</Divider>
      </>
    );
  }
}

DocumentEItems.propTypes = {
  eitems: PropTypes.object,
  showTab: PropTypes.func.isRequired,
};

DocumentEItems.defaultProps = {
  eitems: {},
};
