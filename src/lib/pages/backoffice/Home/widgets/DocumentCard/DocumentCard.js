import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Loader, Error } from '@components';
import { RecordsBriefCard } from '@components/backoffice/RecordsBriefCard';
import { NewButton, SeeAllButton } from '@components/backoffice/buttons';
import { BackOfficeRoutes } from '@routes/urls';
import { documentApi } from '@api';

export default class DocumentCard extends Component {
  constructor(props) {
    super(props);
    this.seeAllUrl = BackOfficeRoutes.documentsListWithQuery;
    this.newDocumentURL = BackOfficeRoutes.documentCreate;
  }

  componentDidMount() {
    const { fetchRequestedWithAvailableItems } = this.props;
    fetchRequestedWithAvailableItems();
  }

  seeAllButton = () => {
    const path = this.seeAllUrl(
      documentApi
        .query()
        .withAvailableItems()
        .withPendingLoans()
        .qs()
    );
    return <SeeAllButton fluid disabled to={path} />;
  };

  newDocumentButton = () => {
    return <NewButton fluid disabled to={this.newDocumentURL} />;
  };

  render() {
    const { data, isLoading, error } = this.props;
    return (
      <Loader isLoading={isLoading}>
        <Error error={error}>
          <RecordsBriefCard
            title={'Documents'}
            stats={data}
            text={'requested on shelf'}
            buttonLeft={this.newDocumentButton()}
            buttonRight={this.seeAllButton()}
          />
        </Error>
      </Loader>
    );
  }
}

DocumentCard.propTypes = {
  fetchRequestedWithAvailableItems: PropTypes.func.isRequired,
  data: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.object,
};

DocumentCard.defaultProps = {
  error: null,
};
