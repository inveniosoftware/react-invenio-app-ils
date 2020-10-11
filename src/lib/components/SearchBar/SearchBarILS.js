import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';

export class SearchBarILS extends Component {
  state = { currentValue: '' };

  componentDidMount() {
    if (this.focusInput) {
      this.focusInput.focus();
    }
  }

  onKeyPressHandler = (event, input) => {
    if (event.key === 'Enter') {
      const { onSearchHandler } = this.props;
      const { currentValue } = this.state;
      onSearchHandler(currentValue);
    }
  };

  onPasteHandler = event => {
    const { onSearchHandler } = this.props;
    const queryString = (event.clipboardData || window.clipboardData).getData(
      'text'
    );
    onSearchHandler(queryString);
  };

  render() {
    const {
      className: parentClass,
      onKeyPressHandler: parentKeyPressHandler,
      onSearchHandler,
      onPasteHandler,
      placeholder,
      ...rest
    } = this.props;
    const { currentValue } = this.state;
    return (
      <Input
        action={{
          icon: 'search',
          onClick: () => onSearchHandler(currentValue),
        }}
        onChange={(event, { value }) => {
          this.setState({ currentValue: value });
        }}
        onKeyPress={parentKeyPressHandler || this.onKeyPressHandler}
        onPaste={onPasteHandler || this.onPasteHandler}
        fluid
        size="big"
        placeholder={placeholder}
        className={`${parentClass} ils-searchbar`}
        ref={input => {
          this.focusInput = input;
        }}
        {...rest}
      />
    );
  }
}

SearchBarILS.propTypes = {
  onKeyPressHandler: PropTypes.func,
  onPasteHandler: PropTypes.func,
  onSearchHandler: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

SearchBarILS.defaultProps = {
  onKeyPressHandler: null,
  onPasteHandler: null,
  placeholder: '',
  className: '',
};
