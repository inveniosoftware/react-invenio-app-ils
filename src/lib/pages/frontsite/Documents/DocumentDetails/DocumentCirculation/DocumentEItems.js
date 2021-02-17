import { DocumentLinks } from '@modules/Document/DocumentLinks';
import { FrontSiteRoutes } from '@routes/urls';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Divider, Header } from 'semantic-ui-react';

export class DocumentEItems extends Component {
  showAll = () => {
    const { showTab } = this.props;
    showTab(5);
    const element = document.getElementById('document-metadata-section');
    element.scrollIntoView({ behavior: 'smooth' });
  };

  onClickEItemRequestLink = () => {
    const medium = 'ELECTRONIC';
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
          <DocumentLinks eitems={eitems} />
        ) : (
          <>
            No electronic resources currently available.{' '}
            <Link to={this.onClickEItemRequestLink()}>
              Request a new electronic copy
            </Link>
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
