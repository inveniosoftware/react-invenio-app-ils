import _keys from 'lodash/keys';

const fields = {
  'accelerator_experiments:accelerator': {
    type: 'string',
    default: '',
  },
  'accelerator_experiments:curated_relation': {
    type: 'boolean',
    default: false,
  },
  'accelerator_experiments:experiment': {
    type: 'string',
    default: '',
  },
  'accelerator_experiments:institution': {
    type: 'string',
    default: '',
  },
  'accelerator_experiments:legacy_name': {
    type: 'string',
    default: '',
  },
  'accelerator_experiments:project': {
    type: 'string',
    default: '',
  },
  'accelerator_experiments:study': {
    type: 'string',
    default: '',
  },
  'standard_CERN_status:CERN_applicability': {
    type: 'string',
    default: '',
    isVisible: false,
  },
  'standard_CERN_status:standard_validity': {
    type: 'string',
    default: '',
    isVisible: false,
    isRequired: true,
  },
  'standard_CERN_status:checkdate': {
    type: 'date',
    default: '',
    isVisible: false,
  },
  'standard_CERN_status:comment': {
    type: 'string',
    default: '',
    isVisible: false,
  },
  'standard_CERN_status:expert': {
    type: 'string',
    default: '',
    isVisible: false,
  },
};

const defaults = () => {
  const keys = _keys(fields);
  let result = {};
  keys.map(key => (result[key] = fields[key]['default']));
  return result;
};

export const extensionsConfig = {
  label: 'Other',
  fields: fields,
  defaults: defaults,
};
