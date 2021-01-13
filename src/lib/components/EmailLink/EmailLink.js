import PropTypes from 'prop-types';
import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

export const EmailLink = ({
  bcc,
  body,
  cc,
  children,
  email,
  subject,
  asButton,
  ...buttonUIProps
}) => {
  const params = [];
  if (bcc) params.push(`bcc=${encodeURIComponent(bcc)}`);
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  if (cc) params.push(`cc=${encodeURIComponent(cc)}`);
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`);

  const url = params ? email + '?' + params.join('&') : email;

  return asButton ? (
    <Button as="a" href={`mailto:${url}`} {...buttonUIProps}>
      <Icon name="envelope" />
      {children}
    </Button>
  ) : (
    <a href={`mailto:${url}`}>{children || email}</a>
  );
};

EmailLink.propTypes = {
  bcc: PropTypes.string,
  body: PropTypes.string,
  cc: PropTypes.string,
  email: PropTypes.string.isRequired,
  subject: PropTypes.string,
  asButton: PropTypes.bool,
  children: PropTypes.node,
};

EmailLink.defaultProps = {
  bcc: null,
  body: null,
  cc: null,
  children: null,
  subject: null,
  asButton: false,
};
