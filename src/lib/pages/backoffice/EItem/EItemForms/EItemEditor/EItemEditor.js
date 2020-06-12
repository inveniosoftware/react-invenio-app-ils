import React, { Component } from 'react';
import { Loader } from '@components/Loader';
import { Error } from '@components/Error';
import { EItemForm } from './EItemForm';
import get from 'lodash/get';
import PropTypes from 'prop-types';

export class EItemEditor extends Component {
  componentDidMount() {
    const { fetchEItemDetails, match } = this.props;
    if (match.params.eitemPid) {
      fetchEItemDetails(match.params.eitemPid);
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
          <EItemForm
            pid={pid}
            data={data}
            title="Edit eitem"
            successSubmitMessage="The eitem was successfully updated."
          />
        </Error>
      </Loader>
    );
  };

  render() {
    const {
      match: {
        params: { eitemPid },
      },
    } = this.props;
    const isEditForm = !!eitemPid;
    return isEditForm ? (
      this.renderEditForm(eitemPid)
    ) : (
      <EItemForm
        title="Create new eitem"
        successSubmitMessage="The eitem was successfully created."
        data={this.initialData}
      />
    );
  }
}

EItemEditor.propTypes = {
  fetchEItemDetails: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.object,
  data: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      eitemPid: PropTypes.string,
    }),
  }).isRequired,
};

EItemEditor.defaultProps = {
  isLoading: false,
  error: null,
};
