import { withCancel } from '@api/utils';
import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ItemForm } from './ItemForm';
import { itemApi } from '@api/items';

export default class ItemEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      isLoading: !!props.match.params.itemPid,
      error: {},
    };
  }

  componentDidMount() {
    const { fetchPastLoans, match } = this.props;
    if (match.params.itemPid) {
      this.fetchItem(match.params.itemPid);
      fetchPastLoans(match.params.itemPid);
    }
  }

  componentWillUnmount() {
    this.cancellableFetchItem && this.cancellableFetchItem.cancel();
  }

  get initialData() {
    const doc = get(this.props, 'location.state.document', null);
    if (doc) {
      return {
        metadata: {
          document: doc.metadata,
          document_pid: doc.metadata.pid,
        },
      };
    }
    return {
      metadata: {
        document: undefined,
        document_pid: undefined,
      },
    };
  }

  fetchItem = async itemPid => {
    this.cancellableFetchItem = withCancel(itemApi.get(itemPid));
    try {
      const response = await this.cancellableFetchItem.promise;
      this.setState({ data: response.data, isLoading: false, error: {} });
    } catch (error) {
      if (error !== 'UNMOUNTED') {
        this.setState({ isLoading: false, error: error });
      }
    }
  };

  renderEditForm = pid => {
    const { isLoading, error, data } = this.state;
    const { itemPastLoans, isLoadingPastLoans } = this.props;

    return (
      <Loader isLoading={isLoading || isLoadingPastLoans}>
        <Error error={error}>
          <ItemForm
            pid={pid}
            data={data}
            title="Edit item"
            itemPastLoans={itemPastLoans}
            successSubmitMessage="The item was successfully updated."
          />
        </Error>
      </Loader>
    );
  };

  render() {
    const {
      match: {
        params: { itemPid },
      },
    } = this.props;
    const isEditForm = !!itemPid;
    return isEditForm ? (
      this.renderEditForm(itemPid)
    ) : (
      <ItemForm
        title="Create new item"
        successSubmitMessage="The item was successfully created."
        data={this.initialData}
      />
    );
  }
}

ItemEditor.propTypes = {
  fetchPastLoans: PropTypes.object.isRequired,
  isLoadingPastLoans: PropTypes.bool.isRequired,
  itemPastLoans: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      itemPid: PropTypes.string,
    }),
  }).isRequired,
};
