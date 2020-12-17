import _isEmpty from 'lodash/isEmpty';

export default (values) => {
  const submitValues = { ...values };
  _isEmpty(submitValues.document)
    ? (submitValues.document_pid = undefined)
    : (submitValues.document_pid = submitValues.document.pid);
  delete submitValues['document'];
  return submitValues;
};
