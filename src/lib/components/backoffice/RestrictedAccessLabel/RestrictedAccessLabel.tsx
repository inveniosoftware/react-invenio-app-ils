import React, { Component } from 'react';
import { Icon, Label } from 'semantic-ui-react';

interface RestrictedAccessLabelProps {
  isRestricted: boolean;
}

export default class RestrictedAccessLabel extends Component<RestrictedAccessLabelProps> {
  render() {
    const { isRestricted } = this.props;
    return isRestricted ? (
      <>
        <Label size="large" color="red">
          <Icon name="lock" />
          Restricted access
        </Label>
        <br />
      </>
    ) : null;
  }
}
