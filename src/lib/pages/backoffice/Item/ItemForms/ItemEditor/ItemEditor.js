import React, { Component } from 'react';
import { Loader } from '@components/Loader';
import { Error } from '@components/Error';
import { ItemForm } from './ItemForm';
import get from 'lodash/get';
import PropTypes from 'prop-types';

export class ItemEditor extends Component {
  componentDidMount() {
    const { fetchItemDetails, match } = this.props;
    if (match.params.itemPid) {
      fetchItemDetails(match.params.itemPid);
    }
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
    return null;
  }

  renderEditForm = pid => {
    const { isLoading, error, data } = this.props;
    return (
      <Loader isLoading={isLoading}>
        <Error error={error}>
          <ItemForm
            pid={pid}
            data={data}
            title="Edit item"
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
  isLoading: PropTypes.bool,
  error: PropTypes.object,
  data: PropTypes.object.isRequired,
  fetchItemDetails: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      itemPid: PropTypes.string,
    }),
  }).isRequired,
};
