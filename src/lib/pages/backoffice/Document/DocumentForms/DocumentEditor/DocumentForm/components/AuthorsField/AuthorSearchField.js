import debounce from 'lodash/debounce';
import escapeRegExp from 'lodash/escapeRegExp';
import PropTypes from 'prop-types';
import React from 'react';
import { Form, Search } from 'semantic-ui-react';

export class AuthorSearchField extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      isLoading: false,
      value: '',
      results: [],
    };
    this.state = this.initialState;
  }

  search = debounce(async query => {
    const { authors, showMaxResults } = this.props;
    if (query.length < 1) {
      this.setState({ isLoading: false, results: [] });
      return null;
    }

    const reTitle = new RegExp(escapeRegExp(query), 'i');
    const isMatch = result => reTitle.test(result);

    let numResults = 0;
    this.setState({
      isLoading: false,
      results: authors.reduce((results, author, index) => {
        if (isMatch(author.full_name)) {
          numResults++;
          if (numResults < showMaxResults) {
            results.push({
              key: author.full_name,
              index: index,
              title: author.full_name,
              description: author.type,
            });
          }
        }
        return results;
      }, []),
    });
  }, 300);

  onFocus = () => {
    // Trigger a search to update in case an author was modified
    const { value } = this.state;
    this.onSearchChange(null, { value: value });
  };

  onResultSelect = (e, { result }) => {
    const { onResultSelect } = this.props;
    if (onResultSelect) {
      onResultSelect(result);
    }
  };

  onSearchChange = (e, { value }) => {
    const { minCharacters, onSearchChange } = this.props;
    if (value.length >= minCharacters) {
      this.setState({ isLoading: true, value: value, results: [] });
      if (onSearchChange) {
        onSearchChange(value);
      }
      this.search(value);
    } else {
      this.setState({ value: value, results: [] });
    }
  };

  onNewAuthor = () => {
    const { onResultSelect, authors } = this.props;

    if (onResultSelect) {
      onResultSelect({
        index: authors.length,
      });
    }
  };

  render() {
    const { isLoading, results, value } = this.state;
    const { minCharacters } = this.props;
    return (
      <Form.Field>
        <label>Authors</label>
        <Form.Button
          type="button"
          content="New author"
          icon="add"
          onClick={this.onNewAuthor}
        />
        <Search
          fluid
          input={{ icon: 'search', iconPosition: 'left' }}
          loading={isLoading}
          minCharacters={minCharacters}
          results={results}
          onFocus={this.onFocus}
          onResultSelect={this.onResultSelect}
          onSearchChange={this.onSearchChange}
          value={value}
        />
      </Form.Field>
    );
  }
}

AuthorSearchField.propTypes = {
  authors: PropTypes.array.isRequired,
  minCharacters: PropTypes.number,
  showMaxResults: PropTypes.number,
  onSearchChange: PropTypes.func,
  onResultSelect: PropTypes.func,
};

AuthorSearchField.defaultProps = {
  minCharacters: 3,
  showMaxResults: 10,
  onSearchChange: null,
  onResultSelect: null,
};
