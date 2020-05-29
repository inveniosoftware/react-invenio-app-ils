import React, { Component } from 'react';
import { Loader, Error } from '@components';
import { ItemForm } from './ItemForm';
import get from 'lodash/get';
import PropTypes from 'prop-types';

export class ItemEditor extends Component {
  componentDidMount() {
    const { fetchItemDetails } = this.props;
    if (this.props.match.params.itemPid) {
      fetchItemDetails(this.props.match.params.itemPid);
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
};
