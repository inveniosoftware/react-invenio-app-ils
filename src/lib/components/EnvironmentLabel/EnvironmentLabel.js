import { AuthenticationGuard } from '@authentication/components/AuthenticationGuard';
import { invenioConfig } from '@config';
import { BackOfficeRoutes } from '@routes/backoffice/backofficeUrls';
import _get from 'lodash/get';
import PropTypes from 'prop-types';
import React from 'react';
import Overridable from 'react-overridable';
import { Icon, Label } from 'semantic-ui-react';

const EnvironmentLabelLayout = ({
  text,
  icon,
  color,
  pointing,
  ...uiProps
}) => {
  return (
    <Label
      color={color}
      pointing={pointing}
      size="small"
      className="environment-label"
      {...uiProps}
    >
      <Icon name={icon} />
      {text}
    </Label>
  );
};

EnvironmentLabelLayout.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  pointing: PropTypes.string.isRequired,
};

const EnvironmentLabelComponent = ({ pointing, ...uiProps }) => {
  const environment = process.env.REACT_APP_ENV_NAME;
  const environmentConfig = invenioConfig.APP.ENVIRONMENTS.find(
    env => env.name === environment
  );
  const display = _get(environmentConfig, 'display');
  if (display) {
    const environmentLabel = (
      <EnvironmentLabelLayout
        text={display.text}
        color={display.color}
        icon={display.icon}
        pointing={pointing}
        {...uiProps}
      />
    );

    if (display.roles) {
      // Highlight base on role
      return (
        <AuthenticationGuard
          silent
          path={BackOfficeRoutes.home}
          authorizedComponent={() => environmentLabel}
          loginComponent={() => null}
          roles={display.roles}
        />
      );
    } else {
      // Unconditional highlighting
      return environmentLabel;
    }
  } else {
    return null;
  }
};

EnvironmentLabelComponent.propTypes = {
  pointing: PropTypes.string.isRequired,
};

export const EnvironmentLabel = Overridable.component(
  'EnvironmentLabel',
  EnvironmentLabelComponent
);
