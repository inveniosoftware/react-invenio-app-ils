import { random } from 'lodash/number';
import React, { Component } from 'react';
import { Item, Placeholder } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export class ILSParagraphPlaceholder extends Component {
  renderLines = () => {
    const { linesNumber, lineLength } = this.props;
    const lines = [];
    const lineLengths = [
      'full',
      'very long',
      'long',
      'medium',
      'short',
      'very short',
    ];
    for (let i = 0; i < linesNumber; i++) {
      lines.push(
        <Placeholder.Line
          key={i}
          length={
            lineLength
              ? lineLength
              : lineLengths[random(lineLengths.length - 1)]
          }
        />
      );
    }
    return lines;
  };

  render() {
    const { isLoading, linesNumber, lineLength, ...restParams } = this.props;

    return isLoading ? (
      <Placeholder {...restParams}>{this.renderLines()}</Placeholder>
    ) : (
      this.props.children
    );
  }
}

ILSParagraphPlaceholder.propTypes = {
  isLoading: PropTypes.bool,
  linesNumber: PropTypes.number.isRequired,
  lineLength: PropTypes.string,
  children: PropTypes.node,
};

ILSParagraphPlaceholder.defaultProps = {
  isLoading: false,
  lineLength: null,
};

export class ILSImagePlaceholder extends Component {
  render() {
    const { isLoading, ...restParams } = this.props;
    return isLoading ? (
      <Placeholder {...restParams}>
        <Placeholder.Image />
      </Placeholder>
    ) : this.props.children ? (
      this.props.children
    ) : null;
  }
}

ILSImagePlaceholder.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.node,
};

ILSImagePlaceholder.defaultProps = {
  isLoading: false,
};

export class ILSHeaderPlaceholder extends Component {
  render() {
    const { isLoading, ...restParams } = this.props;
    return isLoading ? (
      <Placeholder {...restParams}>
        <Placeholder.Header>
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Header>
      </Placeholder>
    ) : this.props.children ? (
      this.props.children
    ) : null;
  }
}

ILSHeaderPlaceholder.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.node,
};

ILSHeaderPlaceholder.defaultProps = {
  isLoading: false,
};

export class ILSItemPlaceholder extends Component {
  render() {
    const { isLoading, ...restParams } = this.props;
    return isLoading ? (
      <Item>
        <Item.Content>
          <Item.Description>
            <ILSParagraphPlaceholder
              isLoading={isLoading}
              linesNumber={4}
              {...restParams}
            />
          </Item.Description>
        </Item.Content>
      </Item>
    ) : this.props.children ? (
      this.props.children
    ) : null;
  }
}

ILSItemPlaceholder.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.node,
};

ILSItemPlaceholder.defaultProps = {
  isLoading: false,
};
