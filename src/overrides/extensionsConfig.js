import { BooleanField } from '@forms/core/BooleanField';
import { StringField } from '@forms/core/StringField';
import _keys from 'lodash/keys';

export const config = {
  'accelerator_experiments:accelerator': {
    Component: StringField,
    default: '',
  },
  'accelerator_experiments:curated_relation': {
    Component: BooleanField,
    default: false,
  },
  'accelerator_experiments:experiment': {
    Component: StringField,
    default: '',
  },
  'accelerator_experiments:institution': {
    Component: StringField,
    default: '',
  },
  'accelerator_experiments:legacy_name': {
    Component: StringField,
    default: '',
  },
  'accelerator_experiments:project': {
    Component: StringField,
    default: '',
  },
  'accelerator_experiments:study': {
    Component: StringField,
    default: '',
  },
  'standard_CERN_status:CERN_applicability': {
    Component: StringField,
    default: '',
  },
  'standard_CERN_status:standard_validity': {
    Component: StringField,
    default: '',
    isRequired: true,
  },
  'standard_CERN_status:checkdate': {
    Component: StringField,
    default: '',
  },
  'standard_CERN_status:comment': {
    Component: StringField,
    default: '',
  },
  'standard_CERN_status:expert': {
    Component: StringField,
    default: '',
  },
};

export const defaults = () => {
  const keys = _keys(config);
  let result = {};
  keys.map(key => (result[key] = config[key]['default']));
  return result;
};
