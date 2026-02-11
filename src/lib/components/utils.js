import { documentApi } from '@api/documents';
import { sessionManager } from '@authentication/services/SessionManager';
import _get from 'lodash/get';

export const prettyPrintBooleanValue = (value) => {
  return value ? 'Yes' : 'No';
};

export const screenIsWiderThan = (pixels) => {
  return window.matchMedia(`(max-width: ${pixels}px)`).matches ? false : true;
};

export const isPrivilegedUser = () => {
  const roles = _get(sessionManager, 'user.roles', []);
  return roles.includes('admin') || roles.includes('librarian');
};

export const isDocumentOverbooked = async (documentPid) => {
  const response = await documentApi.get(documentPid);
  return _get(response, 'data.metadata.circulation.overbooked', false);
};
