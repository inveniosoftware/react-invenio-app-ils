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
  small,
  classContext,
  ...uiProps
}) => {
  return (
    <Label
      color={color}
      pointing={pointing}
      size="small"
      className={`environment-label ${classContext}`}
      {...uiProps}
    >
      <Icon name={icon} />
      {!small && text}
    </Label>
  );
};

EnvironmentLabelLayout.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  pointing: PropTypes.string.isRequired,
  small: PropTypes.bool.isRequired,
  classContext: PropTypes.string.isRequired,
};

const EnvironmentLabelComponent = ({
  pointing,
  small,
  classContext,
  ...uiProps
}) => {
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
        small={small}
        classContext={classContext ? classContext : ''}
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
  small: PropTypes.bool,
  classContext: PropTypes.string,
};

EnvironmentLabelComponent.defaultProps = {
  small: false,
  classContext: null,
};

export const EnvironmentLabel = Overridable.component(
  'EnvironmentLabel',
  EnvironmentLabelComponent
);
