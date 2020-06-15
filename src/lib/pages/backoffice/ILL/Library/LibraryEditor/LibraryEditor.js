import { libraryApi } from '@api/ill';
import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { LibraryForm } from './LibraryForm';

export class LibraryEditor extends Component {
  state = {
    data: {},
    isLoading: true,
    error: {},
  };

  componentDidMount() {
    const { match } = this.props;
    if (match.params.libraryPid) {
      this.fetchlibrary(match.params.libraryPid);
    }
  }

  fetchlibrary = async libraryPid => {
    try {
      const response = await libraryApi.get(libraryPid);
      this.setState({ data: response.data, isLoading: false, error: {} });
    } catch (error) {
      this.setState({ isLoading: false, error: error });
    }
  };

  renderEditForm = pid => {
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
