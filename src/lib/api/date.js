import _get from 'lodash/get';
import { DateTime } from 'luxon';

/**
 *  Serializes date for display in short format
 *  @param {DateTime} date luxon DateTime
 *  @returns {String}
 */
export const toShortDateTime = date => {
  return date instanceof DateTime ? date.toFormat('yyyy-MM-dd HH:mm') : date;
};

/**
 *  Serializes date for display in short format
 *  @param {DateTime} date luxon DateTime
 *  @returns {String}
 */
export const toShortDate = date => {
  return date instanceof DateTime ? date.toFormat('yyyy-MM-dd') : date;
};

/**
 *  Serializes date for display in tables
 */
export function dateFormatter({ col, row }, defaultValue = null) {
  const dateField = _get(row, col.field);
  return dateField
    ? DateTime.fromISO(dateField).toLocaleString()
    : defaultValue;
}
