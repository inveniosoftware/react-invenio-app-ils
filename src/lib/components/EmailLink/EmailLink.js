import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

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
  if (bcc) params.push(`bcc=${bcc}`);
  if (body) params.push(`body=${body}`);
  if (cc) params.push(`cc=${cc}`);
  if (subject) params.push(`subject=${subject}`);

  const url = params.length > 0 ? email + '?' : email;

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
};

EmailLink.defaultProps = {
  bcc: null,
  body: null,
  cc: null,
  subject: null,
  asButton: false,
};
