import { libraryApi } from '@api/ill';
import { withCancel } from '@api/utils';
import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { LibraryForm } from './LibraryForm';

export class LibraryEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      isLoading: !!props.match.params.libraryPid,
      error: {},
    };
  }

  componentDidMount() {
    const { match } = this.props;
    if (match.params.libraryPid) {
      this.fetchLibrary(match.params.libraryPid);
    }
  }

  componentWillUnmount() {
    this.cancellableFetchLibrary && this.cancellableFetchLibrary.cancel();
  }

  fetchLibrary = async (libraryPid) => {
    this.cancellableFetchLibrary = withCancel(libraryApi.get(libraryPid));
    try {
      const response = await this.cancellableFetchLibrary.promise;
      this.setState({ data: response.data, isLoading: false, error: {} });
    } catch (error) {
      if (error !== 'UNMOUNTED') {
        this.setState({ isLoading: false, error: error });
      }
    }
  };

  renderEditForm = (pid) => {
    const { isLoading, error, data } = this.state;
    return (
      <Loader isLoading={isLoading}>
        <Error error={error}>
          <LibraryForm
            pid={pid}
            data={data}
            title="Edit library"
            successSubmitMessage="The library was successfully updated."
          />
        </Error>
      </Loader>
    );
  };

  render() {
    const {
      match: {
        params: { libraryPid },
      },
    } = this.props;
    const isEditForm = !!libraryPid;
    return isEditForm ? (
      this.renderEditForm(libraryPid)
    ) : (
      <LibraryForm
        title="Create new library"
        successSubmitMessage="The library was successfully created."
      />
    );
  }
}

LibraryEditor.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      libraryPid: PropTypes.string,
    }),
  }).isRequired,
};
