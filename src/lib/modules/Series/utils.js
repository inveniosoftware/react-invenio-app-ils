import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';

/**
 * Find volume number of a record.
 * @param {record} record - Record to find volume for
 * @param {pidObject} parentPid - Parent PID object that the record belongs to
 */
export const findVolume = (record, parentPid) => {
  if (_isEmpty(parentPid)) {
    return null;
  }
  const serials = _get(record, 'metadata.relations.serial', []);
  const parent = serials.find(
    relation =>
      relation.pid_value === parentPid && relation.pid_type === 'serid'
  );
  return parent ? parent.volume : null;
};
