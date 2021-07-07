import PropTypes from 'prop-types';
import React, { Component, createRef } from 'react';
import { Input } from 'semantic-ui-react';
import { screenIsWiderThan } from '@components/utils';
import { Breakpoints } from '@components/Media';

export class SearchBarILS extends Component {
  inputRef = createRef();

  state = { currentValue: '' };

  componentDidMount() {
    const { responsiveAutofocus } = this.props;
    const autofocus = screenIsWiderThan(Breakpoints.computer);
    if (responsiveAutofocus && autofocus) {
      this.inputRef.current.focus();
    } else if (!responsiveAutofocus) {
      this.inputRef.current.focus();
    }
  }

  clearQueryString = () => {
    this.setState({ currentValue: '' });
  };

  onKeyPressHandler = (event, input) => {
    if (event.key === 'Enter') {
      const { onSearchHandler } = this.props;
      const { currentValue } = this.state;
      onSearchHandler(currentValue);
    }
  };

  onPasteHandler = (event) => {
    const { onSearchHandler } = this.props;
    event.preventDefault();
    const queryString = (event.clipboardData || window.clipboardData).getData(
      'text'
    );
    this.setState({ currentValue: queryString });
    onSearchHandler(queryString);
  };

  render() {
    const {
      className: parentClass,
      onKeyPressHandler: parentKeyPressHandler,
      onSearchHandler,
      onPasteHandler,
      onChangeHandler,
      placeholder,
      ref,
      responsiveAutofocus,
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
          onChangeHandler && onChangeHandler(value);
        }}
        value={currentValue}
        onKeyPress={parentKeyPressHandler || this.onKeyPressHandler}
        onPaste={onPasteHandler || this.onPasteHandler}
        fluid
        size="big"
        placeholder={placeholder}
        className={`${parentClass} ils-searchbar`}
        ref={this.inputRef}
        {...rest}
      />
    );
  }
}

SearchBarILS.propTypes = {
  onKeyPressHandler: PropTypes.func,
  ref: PropTypes.func,
  onPasteHandler: PropTypes.func,
  onSearchHandler: PropTypes.func.isRequired,
  onChangeHandler: PropTypes.func,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  responsiveAutofocus: PropTypes.bool,
};

SearchBarILS.defaultProps = {
  onKeyPressHandler: null,
  onPasteHandler: null,
  onChangeHandler: null,
  placeholder: '',
  className: '',
  responsiveAutofocus: false,
  ref: null,
};
