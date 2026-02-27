import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

interface SeeAllButtonProps {
  to: string;
  fluid?: boolean;
  disabled?: boolean;
}

export default class SeeAllButton extends Component<SeeAllButtonProps> {
  static defaultProps = {
    fluid: false,
    disabled: false,
  };

  render() {
    const { fluid, disabled, to } = this.props;
    return (
      <Button as={Link} to={to} size="small" disabled={disabled} fluid={fluid}>
        See all
      </Button>
    );
  }
}
