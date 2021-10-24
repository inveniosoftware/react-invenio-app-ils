import { FrontSiteRoutes } from '@routes/urls';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Divider, Header } from 'semantic-ui-react';
import { DocumentEItemUrls } from '@modules/Document/DocumentEItemUrls';
import _get from 'lodash/get';

export class DocumentEItems extends Component {
  showAll = () => {
    const { showTab } = this.props;
    showTab(5);
    const element = document.getElementById('document-metadata-section');
    element.scrollIntoView({ behavior: 'smooth' });
  };

  onClickEItemRequestLink = () => {
    const {
      documentDetails: {
        metadata: { authors, title, publication_year },
        metadata,
      },
    } = this.props;
    const medium = 'DIGITAL';
    const publisher = _get(metadata, 'imprint.publisher');
    const isbn = _get(metadata, 'identifiers[0].value');

    const formData = {
      medium,
      authors: authors[0].full_name,
      title,
      publication_year,
    };

    if (publisher) {
      formData['publisher'] = publisher;
    }

    if (isbn) {
      formData['isbn'] = isbn;
    }

    return {
      pathname: FrontSiteRoutes.documentRequestForm,
      state: { formData },
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
  documentDetails: PropTypes.object,
};

DocumentEItems.defaultProps = {
  eitems: {},
  documentDetails: {},
};
