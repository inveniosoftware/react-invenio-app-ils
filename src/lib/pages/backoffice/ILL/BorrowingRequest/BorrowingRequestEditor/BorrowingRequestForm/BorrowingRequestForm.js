import { borrowingRequestApi } from '@api/ill';
import { withCancel } from '@api/utils';
import { vocabularyApi } from '@api/vocabularies';
import { Loader } from '@components/Loader';
import { invenioConfig } from '@config';
import { BaseForm } from '@forms/core/BaseForm';
import { goTo } from '@history';
import { ILLRoutes } from '@routes/urls';
import { getIn } from 'formik';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Header, Segment } from 'semantic-ui-react';
import { OrderInfo } from './OrderInfo';
import { Payment } from './Payment';

const submitSerializer = values => {
  const submitValues = { ...values };
  submitValues.library_pid = values.library.pid;
  submitValues.document_pid = values.document.pid;
  submitValues.patron_pid = values.patron.pid;
  return submitValues;
};

export class BorrowingRequestForm extends Component {
  state = {
    isLoading: true,
    // eslint-disable-next-line react/no-unused-state
    error: null,
    currencies: [],
  };

  componentDidMount() {
    this.fetchCurrencies();
  }

  componentWillUnmount() {
    this.cancellableFetchData && this.cancellableFetchData.cancel();
  }

  get buttons() {
    const { pid: isEditing } = this.props;
    if (isEditing) {
      return [
        {
          name: 'update',
          content: 'Update borrowing request',
          primary: true,
          type: 'submit',
        },
      ];
    }

    return [
      {
        name: 'create',
        content: 'Create borrowing request',
        primary: true,
        type: 'submit',
      },
    ];
  }

  query = () => {
    const searchQuery = vocabularyApi
      .query()
      .withType(invenioConfig.VOCABULARIES.currencies)
      .qs();
    return vocabularyApi.list(searchQuery);
  };

  serializer = hit => ({
    key: hit.metadata.key,
    value: hit.metadata.key,
    text: hit.metadata.key,
  });

  fetchCurrencies = async () => {
    this.cancellableFetchData = withCancel(this.query());
    try {
      const response = await this.cancellableFetchData.promise;
      const currencies = response.data.hits.map(hit => this.serializer(hit));
      // eslint-disable-next-line react/no-unused-state
      this.setState({ isLoading: false, currencies: currencies, error: null });
    } catch (error) {
      if (error !== 'UNMOUNTED') {
        this.setState({
          // eslint-disable-next-line react/no-unused-state
          isloading: false,
          currencies: [
            { key: '', value: '', text: 'Failed to load currencies.' },
          ],
          // eslint-disable-next-line react/no-unused-state
          error: {
            content: 'Failed to load currencies.',
            pointing: 'above',
          },
        });
      }
    }
  };

  updateBorrowingRequest = (pid, data) => {
    return borrowingRequestApi.update(pid, data);
  };

  createBorrowingRequest = data => {
    return borrowingRequestApi.create(data);
  };

  successCallback = (response, submitButton) => {
    const borrowingRequest = getIn(response, 'data');
    goTo(ILLRoutes.borrowingRequestDetailsFor(borrowingRequest.metadata.pid));
  };

  render() {
    const { currencies, isLoading } = this.state;
    const { data, successSubmitMessage, title, pid } = this.props;
    return (
      <BaseForm
        initialValues={data ? data.metadata : {}}
        editApiMethod={this.updateBorrowingRequest}
        createApiMethod={this.createBorrowingRequest}
        successCallback={this.successCallback}
        successSubmitMessage={successSubmitMessage}
        title={title}
        pid={pid}
        submitSerializer={submitSerializer}
        buttons={this.buttons}
      >
        <Segment raised>
          <Header dividing>Order information</Header>
          <Loader isLoading={isLoading}>
            <OrderInfo currencies={currencies} />
          </Loader>
        </Segment>
        <Segment raised>
          <Header dividing>Payment information</Header>
          <Loader isLoading={isLoading}>
            <Payment currencies={currencies} />
          </Loader>
        </Segment>
      </BaseForm>
    );
  }
}

BorrowingRequestForm.propTypes = {
  data: PropTypes.object,
  successSubmitMessage: PropTypes.string,
  title: PropTypes.string,
  pid: PropTypes.string,
};

BorrowingRequestForm.defaultProps = {
  data: null,
  successSubmitMessage: null,
  title: null,
  pid: null,
};
