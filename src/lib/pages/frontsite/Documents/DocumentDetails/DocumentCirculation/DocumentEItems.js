import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Divider, Header } from 'semantic-ui-react';
import { DocumentLinks } from '@modules/Document/DocumentLinks';

export class DocumentEItems extends Component {
  showAll = () => {
    const { showTab } = this.props;
    showTab(5);
    const element = document.getElementById('document-metadata-section');
    element.scrollIntoView({ behavior: 'smooth' });
  };

  render() {
    const { eitems } = this.props;

    return eitems.total > 0 ? (
      <>
        <Header as="h3">Access online</Header>
        <DocumentLinks eitems={eitems} />
        <Divider horizontal>Or</Divider>
      </>
    ) : null;
  }
}

DocumentEItems.propTypes = {
  eitems: PropTypes.object,
  showTab: PropTypes.func.isRequired,
};

DocumentEItems.defaultProps = {
  eitems: {},
};
