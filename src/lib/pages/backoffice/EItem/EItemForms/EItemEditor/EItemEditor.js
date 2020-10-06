import { withCancel } from '@api/utils';
import React, { Component } from 'react';
import { Loader } from '@components/Loader';
import { Error } from '@components/Error';
import { EItemForm } from './EItemForm';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import { eItemApi } from '@api/eitems';

export class EItemEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      isLoading: !!props.match.params.eitemPid,
      error: {},
    };
  }

  componentDidMount() {
    const { match } = this.props;
    if (match.params.eitemPid) {
      this.fetchEItem(match.params.eitemPid);
    }
  }

  componentWillUnmount() {
    this.cancellableFetchEItem && this.cancellableFetchEItem.cancel();
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

  fetchEItem = async eitemPid => {
    this.cancellableFetchEItem = withCancel(eItemApi.get(eitemPid));
    try {
      const response = await this.cancellableFetchEItem.promise;
      this.setState({ data: response.data, isLoading: false, error: {} });
    } catch (error) {
      if (error !== 'UNMOUNTED') {
        this.setState({ isLoading: false, error: error });
      }
    }
  };

  renderEditForm = pid => {
    const { isLoading, error, data } = this.state;
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
  match: PropTypes.shape({
    params: PropTypes.shape({
      eitemPid: PropTypes.string,
    }),
  }).isRequired,
};
