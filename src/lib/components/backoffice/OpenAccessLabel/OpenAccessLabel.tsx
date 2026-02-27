import React, { Component } from 'react';
import { Icon, Label, SemanticSIZES } from 'semantic-ui-react';

interface OpenAccessLabelProps {
  openAccess: boolean;
  size?: SemanticSIZES;
}

export default class OpenAccessLabel extends Component<OpenAccessLabelProps> {
  static defaultProps = {
    size: 'medium' as SemanticSIZES,
  };

  render() {
    const { openAccess, size } = this.props;
    return openAccess ? (
      <Label size={size} color="green">
        <Icon name="lock open" />
        Open access
      </Label>
    ) : (
      <Label size={size}>
        <Icon name="lock" />
        Not open access
      </Label>
    );
  }
}
