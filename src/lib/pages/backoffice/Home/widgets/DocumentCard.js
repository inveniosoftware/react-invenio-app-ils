import { documentApi } from '@api/documents';
import { withCancel } from '@api/utils';
import { NewButton } from '@components/backoffice/buttons/NewButton';
import { SeeAllButton } from '@components/backoffice/buttons/SeeAllButton';
import { RecordsBriefCard } from '@components/backoffice/RecordsBriefCard';
import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import { BackOfficeRoutes } from '@routes/urls';
import React, { Component } from 'react';

export class DocumentCard extends Component {
  constructor(props) {
    super(props);
    this.query = documentApi
      .query()
      .withAvailableItems()
      .withPendingLoans()
      .qs();

    this.state = {
      data: 0,
      isLoading: true,
      error: {},
    };
  }

  componentDidMount() {
    this.fetch();
  }

  componentWillUnmount() {
    this.cancellableFetch && this.cancellableFetch.cancel();
  }

  fetch = async () => {
    this.cancellableFetch = withCancel(documentApi.count(this.query));
    this.setState({ isLoading: true });
    try {
      const response = await this.cancellableFetch.promise;
      this.setState({ data: response.data, isLoading: false, error: {} });
    } catch (error) {
      if (error !== 'UNMOUNTED') {
        this.setState({ isLoading: false, error: error });
      }
    }
  };

  seeAllButton = () => {
    const path = BackOfficeRoutes.documentsListWithQuery(
      documentApi.query().withAvailableItems().withPendingLoans().qs()
    );
    return <SeeAllButton fluid to={path} />;
  };

  newDocumentButton = () => {
    return <NewButton fluid to={BackOfficeRoutes.documentCreate} />;
  };

  render() {
    const { data, isLoading, error } = this.state;
    return (
      <Loader isLoading={isLoading}>
        <Error error={error}>
          <RecordsBriefCard
            title="Documents"
            stats={data}
            text="requested on shelf"
            buttonLeft={this.newDocumentButton()}
            buttonRight={this.seeAllButton()}
          />
        </Error>
      </Loader>
    );
  }
}

DocumentCard.propTypes = {};

DocumentCard.defaultProps = {};
